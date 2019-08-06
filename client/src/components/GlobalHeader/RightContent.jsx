import React, { Component } from 'react';
import { Icon, Tooltip,Button } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';


class GlobalHeaderRight extends Component {
  render() {
    const { theme, layout, userInfo } = this.props;
    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
      className = `${styles.right}  ${styles.dark}`;
    }

    return (
      <div className={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder='搜索'
          onSearch={value => {
            console.log('input', value); // tslint:disable-line no-console
          }}
          onPressEnter={value => {
            console.log('enter', value); // tslint:disable-line no-console
          }}
        />
        {/*<Tooltip*/}
        {/*  title={formatMessage({*/}
        {/*    id: 'component.globalHeader.help',*/}
        {/*  })}*/}
        {/*>*/}
        {/*  <a*/}
        {/*    target="_blank"*/}
        {/*    href="https://pro.ant.design/docs/getting-started"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*    className={styles.action}*/}
        {/*  >*/}
        {/*    <Icon type="question-circle-o" />*/}
        {/*  </a>*/}
        {/*</Tooltip>*/}
        {
          userInfo?
            <Avatar />:
            <span>
              <Button style={{padding:'0 2px'}} type="link" href='/page/user/login'>登录</Button>
              /
              <Button style={{padding:'0 2px'}} type="link" href='/page/user/register'>注册</Button>
            </span>
        }

        {/*<SelectLang className={styles.action} /> */}
      </div>
    );
  }
}

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
