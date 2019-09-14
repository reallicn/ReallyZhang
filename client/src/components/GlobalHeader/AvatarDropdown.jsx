import React from 'react';
import { Avatar, Menu, Spin, Icon } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    const { dispatch } = this.props;
    switch (key) {
      case 'logout':
        dispatch({
          type: 'user/logout',
        });
        break;
      case 'center':
        break;
      case 'write':
        router.push('/page/write/blog');
        break;
      default:
        break;
    }

  };

  render() {
    const { currentUser = {}, menu } = this.props;
    console.log('currentUser', currentUser);
    // if (!menu) {
    //   return (
    //     <span className={`${styles.action} ${styles.account}`}>
    //       <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
    //       <span className={styles.name}>{currentUser.username}</span>
    //     </span>
    //   );
    // }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="write">
          <Icon type="edit" />
          写文章
        </Menu.Item>
        <Menu.Item key="center">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.username ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span style={{ display: 'inline-block', maxWidth: 50 }} className={styles.name}>{currentUser.username}</span>
        </span>
      </HeaderDropdown>
    ) : (
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
