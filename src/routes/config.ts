export interface IFMenuBase {
  key: string;
  title: string;
  icon?: string;
  hidden?: boolean;
  component?: string;
  query?: string;
  auth?: string;
  route?: string;
  /** 是否登录校验，true不进行校验（访客） */
  login?: boolean;
}

export interface IFMenu extends IFMenuBase {
  subs?: IFMenuBase[];
}

const menus: {
  menus: IFMenu[];
  others: IFMenu[] | [];
  [index: string]: any;
} = {
  menus: [
    // 菜单相关路由
    { key: '/app/home', title: '首页', icon: 'home', component: 'Home' },
    {
      key: '/app/roster',
      title: '花名册',
      icon: 'profile',
      subs: [
        { key: '/app/roster/rosterList', title: '花名册', component: 'Roster' },
        { key: '/app/roster/rosterDetail', title: '员工详情', component: 'RosterDetail', hidden: true }
      ]
    }
  ],
  others: [], // 非菜单相关路由
};

export default menus;
