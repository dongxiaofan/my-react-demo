export interface IFMenuBase {
  key: string;
  link: string;
  title: string;
  icon?: string;
  hidden?: boolean;
  component?: string;
  query?: string;
  auth?: string;
  route?: string;
  subs?: any;
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
    { key: 'home', link: '/app/home', title: '首页', icon: 'home', component: 'Home' },
    {
      key: 'dailyManage',
      link: '/app/dailyManage',
      title: '日常管理',
      icon: 'profile',
      subs: [
        { key: 'workPlan', link: '/app/dailyManage/workPlan', title: '工作计划', component: 'WorkPlan' }
      ]
    },
    {
      key: 'customer',
      link: '/app/customer',
      title: '客户管理',
      icon: 'profile',
      subs: [
        { key: 'rosterList', link: '/app/customer/rosterList', title: '花名册', component: 'Roster' },
        { key: 'rosterDetail', link: '/app/customer/rosterDetail', title: '员工详情', component: 'RosterDetail', hidden: true },
        { key: 'employeeAccount', link: '/app/customer/account/employeeAccount', title: '员工账号', component: 'EmployeeAccount', hidden: true },
        {
          key: 'account',
          link: '/app/customer/account',
          title: '账号管理',
          subs: [
            { key: 'employeeAccount', link: '/app/customer/account/employeeAccount', title: '员工账号', component: 'EmployeeAccount' }
          ]
        }
      ]
    },
    {
      key: 'policySupport',
      link: '/app/policySupport',
      title: '政策文件',
      icon: 'file-word',
      subs: [
        { key: 'policySupportList', link: '/app/policySupport/policySupportList', title: '政策文件列表', component: 'PolicySupportList' }
      ]
    },
    // { key: 'about', link: '/app/about', title: '关于我', icon: 'about', component: 'About' }
  ],
  others: [
    { key: 'about', link: '/app/about', title: '关于我', icon: 'about', component: 'About' }
  ], // 非菜单相关路由
};

export default menus;
