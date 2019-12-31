/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import routes from '../../routes/config';
import SiderMenu from './SiderMenu';

const { Sider } = Layout;

type SiderCustomProps = RouteComponentProps<any> & {
  popoverHide?: () => void;
  collapsed?: boolean;
};
type SiderCustomState = {
  collapsed?: boolean | undefined;
  openKey: any;
  firstHide: boolean | undefined;
  selectedKey: string;
  mode: string;
};

class SiderCustom extends Component<SiderCustomProps, SiderCustomState> {

  constructor(props: any) {
    super(props);
    this.state = {
      mode: 'inline',
      openKey: [],
      selectedKey: '',
      firstHide: true, // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
  }

  componentDidUpdate() {
    if (this.props.collapsed !== this.state.collapsed) {
      const { collapsed, location } = this.props;
      const { pathname } = location;
      // this.setState({
      //   openKey: pathname.substr(0, pathname.lastIndexOf('/')),
      //   selectedKey: pathname,
      //   collapsed,
      //   mode: collapsed ? 'vertical' : 'inline',
      //   firstHide: collapsed,
      // });
    }
  }

  menuClick = (e: any) => {
    this.setState({
      selectedKey: e.link,
    });
    const { popoverHide } = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    popoverHide && popoverHide();
  };
  openMenu = (v: string[]) => {
    console.log('🧞‍ v[v.length - 1]: ', v[v.length - 1], ', 🥁 v: ', v)
    this.setState({
      openKey: v,
      firstHide: false,
    });
  };
  render() {
    const { selectedKey, openKey, firstHide, collapsed } = this.state;
    const path = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1, this.props.location.pathname.length);
    return (
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={collapsed}
        style={{ overflowY: 'auto' }}
      >
        <div className="logo" />
        {/* <p className="text-danger">⭐ {[selectedKey]}</p> */}
        {/* <p className="text-danger">⭐ {[path]}</p> */}
        <SiderMenu
          menus={routes.menus}
          onClick={this.menuClick}
          mode="inline"
          // selectedKeys={[selectedKey]}
          selectedKeys={[path]}
          openKeys={firstHide ? [] : openKey}
          onOpenChange={this.openMenu}
        />
        <style>
          {`
            #nprogress .spinner{
              left: ${collapsed ? '70px' : '206px'};
              right: 0 !important;
            }
          `}
        </style>
      </Sider>
    );
  }
}

export default withRouter(SiderCustom);
