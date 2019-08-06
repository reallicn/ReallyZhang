import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Tabs, Input, Icon, Form, Button, Row, Col } from 'antd';
import styles from './Login.less';


const { TabPane } = Tabs;

/**
 * 在线PDF阅读器，登录记录位置，添加笔记等
 */
@connect((login)=>({
    login
  }))
class Register extends Component {

  state = {
    type:'email'

  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const {type}=this.state;
        const {dispatch}=this.props;
        dispatch({
          type:'user/doUserRegister',
          payload:{
            type,
            ...values
          }
        });
      }
    });
  };


  handleTabsChange = (type) => {

    this.setState({
        type
    });
  }

  render() {
    const {type}=this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.Login}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Tabs activeKey={type} onChange={this.handleTabsChange}>
            <TabPane tab="邮箱注册" key="email">
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: type==='email', message: '请输入的你邮箱' }],
                })(
                  <Input
                    size='large'
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="邮箱"
                    allowClear
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: type==='email', message: '请输入你的邮箱验证码' }],
                    })(
                      <Input
                        size='large'
                        prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="验证码"
                      />,
                    )}
                  </Col>
                  <Col style={{textAlign:"right"}} span={8}>
                    <Button size='large' style={{width:'100%'}}>发送验证码</Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入你的密码' }],
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码，至少6位，区分大小写"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('repassword', {
                  rules: [{ required: true, message: '请确认你的密码' }],
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="确认密码"
                  />,
                )}
              </Form.Item>

            </TabPane>
            <TabPane tab="手机号注册" key="phone">

              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{ required: type==='phone', message: '请输入你的手机号' }],
                })(
                  <Input
                    size='large'
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="手机号"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: '请输入手机验证码' }],
                    })(
                      <Input
                        size='large'
                        prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="验证码"
                      />,
                    )}
                  </Col>
                  <Col style={{textAlign:"right"}} span={8}>
                    <Button size='large' style={{width:'100%'}}>获取验证码</Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入你的密码' }],
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码，至少6位，区分大小写"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('repassword', {
                  rules: [{ required: true, message: '请再次确认你的密码' }],
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="确认密码"
                  />,
                )}
              </Form.Item>


            </TabPane>
          </Tabs>
          <Form.Item>
            <Button size='large' style={{ display: 'block', width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
              注册
            </Button>
            <Link style={{ float: 'right'}} to="/page/user/login">使用已有账户登录</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}


export default Form.create()(Register);
