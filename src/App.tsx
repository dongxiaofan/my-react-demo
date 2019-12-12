import React, { Component } from 'react';
import Routes from './routes';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/layout/SiderCustom';
import HeaderCustom from './components/layout/HeaderCustom';
import { Layout, notification, Icon } from 'antd';
import { connectAlita } from 'redux-alita';
import { checkLogin } from './utils';

const { Content, Footer } = Layout;

type AppProps = {
  setAlitaState: (param: any) => void;
  auth: any;
  responsive: any;
};

class App extends Component<AppProps> {
  state = {
    collapsed: false,
    title: '',
  };
  componentWillMount() {
    const { setAlitaState } = this.props;
    let user,
      storageUser = localStorage.getItem('user');
    user = storageUser && JSON.parse(storageUser);
    // user && receiveData(user, 'auth');
    user && setAlitaState({ stateName: 'auth', data: user });
    // receiveData({a: 213}, 'auth');
    // fetchData({funcName: 'admin', stateName: 'auth'});
    this.getClientWidth();
    window.onresize = () => {
      this.getClientWidth();
    };
  }
  componentDidMount() {
    const openNotification = () => {
      notification.open({
        message: '博主-yezihaohao',
        icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
        duration: 0,
      });
      localStorage.setItem('isFirst', JSON.stringify(true));
    };
    const storageFirst = localStorage.getItem('isFirst');
    if (storageFirst) {
      const isFirst = JSON.parse(storageFirst);
      !isFirst && openNotification();
    }
  }
  getClientWidth = () => {
    // 获取当前浏览器宽度并设置responsive管理响应式
    const { setAlitaState } = this.props;
    const clientWidth = window.innerWidth;
    console.log(clientWidth);
    setAlitaState({ stateName: 'responsive', data: { isMobile: clientWidth <= 992 } });
    // receiveData({isMobile: clientWidth <= 992}, 'responsive');
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const { title } = this.state;
    const { auth = { data: {} }, responsive = { data: {} } } = this.props;
    return (
      <DocumentTitle title={title}>
        <Layout>
          {/* 左边 */}
          {!responsive.data.isMobile && checkLogin(auth.data.permissions) && (
            <SiderCustom collapsed={this.state.collapsed} />
          )}

          {/* 右边 */}
          <Layout style={{ flexDirection: 'column' }}>
            <HeaderCustom
              toggle={this.toggle}
              collapsed={this.state.collapsed}
              user={auth.data || {}}
            />
            <Content>
              <Routes auth={auth} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              React-Admin ©{new Date().getFullYear()} Created by Dong Xiaofan
            </Footer>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default connectAlita(['auth', 'responsive'])(App);
