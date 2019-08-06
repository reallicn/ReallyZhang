import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Tabs, Input, Icon, Form, Checkbox, Button, Row, Col } from 'antd';
import styles from './Login.less';



const { TabPane } = Tabs;

/**
 * 在线PDF阅读器，登录记录位置，添加笔记等
 */
@connect((login)=>({
  login
}))
class Login extends Component {

  state = {
    type:'account',
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const {type}=this.state;
        const {dispatch}=this.props;
        dispatch({
          type:'user/doUserLogin',
          payload:{
            type,
            ...values
          }
        });
      }
    });
  };


  handleTabsChange = (type) => {
    this.setState({type});
  }

  render() {
    const {type}=this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.Login}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Tabs activeKey={type} onChange={this.handleTabsChange}>
            <TabPane tab="账号密码登录" key="account">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: type === 'account', message: '请输入你的账号' }],
                })(
                  <Input
                    size='large'
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="账号"
                    allowClear
                  />,
                )}
              </Form.Item>
              <Form.Item style={{marginBottom:16}}>
                {getFieldDecorator('password', {
                  rules: [{ required: type === 'account', message: '请输入你的密码' }],
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
            </TabPane>
            <TabPane tab="手机号登录" key="phone">

              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{ required: type === 'phone', message: '请输入你的手机号' }],
                })(
                  <Input
                    size='large'
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="手机号"
                  />,
                )}
              </Form.Item>
              <Form.Item style={{marginBottom:16}}>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: type === 'phone', message: '请输入你的短信验证码' }],
                    })(
                      <Input
                        size='large'
                        prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="验证码"
                      />,
                    )}
                  </Col>
                  <Col style={{textAlign:"right"}} span={8}>
                    <Button size='large' style={{width:'100%'}}>获取验证码</Button>
                  </Col>
                </Row>
              </Form.Item>


            </TabPane>
          </Tabs>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>自动登录</Checkbox>)}
            <Link style={{ float: 'right'}} to="/page/user/register">注册账号</Link>
            {/* <Link className="login-form-forgot" to="">
              忘记密码
            </Link> */}
            <Button size='large' style={{ display: 'block', marginTop: 16, width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>

          </Form.Item>
        </Form>
      </div>
    );
  }
}


export default Form.create()(Login);
