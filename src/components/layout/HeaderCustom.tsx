/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import screenfull from 'screenfull';
import avater from '@/assets/images/avater.png';
import SiderCustom from './SiderCustom';
import { Menu, Icon, Layout, Badge, Popover } from 'antd';
import { queryString } from '../../utils';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connectAlita } from 'redux-alita';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

type HeaderCustomProps = RouteComponentProps<any> & {
  toggle: () => void;
  collapsed: boolean;
  user: any;
  responsive?: any;
  path?: string;
};
type HeaderCustomState = {
  user: any;
  visible: boolean;
};

class HeaderCustom extends Component<HeaderCustomProps, HeaderCustomState> {
  state = {
    user: '',
    visible: false,
  };
  componentDidMount() {
    const QueryString = queryString() as any;
    let _user,
      storageUser = localStorage.getItem('user');

    _user = (storageUser && JSON.parse(storageUser)) || '测试';
    // if (!_user && QueryString.hasOwnProperty('code')) {
    //   gitOauthToken(QueryString.code).then((res: any) => {
    //     gitOauthInfo(res.access_token).then((info: any) => {
    //       this.setState({
    //         user: info,
    //       });
    //       localStorage.setItem('user', JSON.stringify(info));
    //     });
    //   });
    // } else {
    //   this.setState({
    //     user: _user,
    //   });
    // }
    this.setState({
      user: _user,
    });
  }
  screenFull = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  };
  menuClick = (e: { key: string }) => {
    e.key === 'logout' && this.logout();
  };
  logout = () => {
    localStorage.removeItem('user');
    this.props.history.push('/login');
  };
  popoverHide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = (visible: boolean) => {
    this.setState({ visible });
  };
  render() {
    const { responsive = { data: {} } } = this.props;
    return (
      <Header className="custom-theme header">
        {responsive.data.isMobile ? (
          <Popover
            content={<SiderCustom popoverHide={this.popoverHide} />}
            trigger="click"
            placement="bottomLeft"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
          >
            <Icon type="bars" className="header__trigger custom-trigger" />
          </Popover>
        ) : (
            <Icon
              className={this.props.collapsed ? 'pl-80 header__trigger custom-trigger' : 'pl-200 header__trigger custom-trigger'}
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggle}
            />
          )}
        <Menu
          mode="horizontal"
          className="pull-right"
          onClick={this.menuClick}
        >
          <SubMenu
            title={
              <div className="avatar">
                <img src={avater} alt="头像" />
              </div>
            }
          >
            <MenuItemGroup title="用户中心">
              <Menu.Item key="logout">
                <span onClick={this.logout}>退出登录</span>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

// 重新设置连接之后组件的关联类型
const HeaderCustomConnect: React.ComponentClass<
  HeaderCustomProps,
  HeaderCustomState
> = connectAlita(['responsive'])(HeaderCustom);

export default withRouter(HeaderCustomConnect);
