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
      icon: 'contacts',
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
        { key: 'bankCashArrivalList', link: '/app/customer/bankCashArrivalList', title: '银行到款管理', component: 'BankCashArrival' },
        // { key: 'employeeAccount', link: '/app/customer/account/employeeAccount', title: '员工账号', component: 'EmployeeAccount', hidden: true },
        // {
        //   key: 'account',
        //   link: '/app/customer/account',
        //   title: '账号管理',
        //   subs: [
        //     { key: 'employeeAccount', link: '/app/customer/account/employeeAccount', title: '员工账号', component: 'EmployeeAccount' }
        //   ]
        // }
      ]
    },
    {
      key: 'account',
      link: '/app/account',
      title: '账号管理',
      icon: 'appstore',
      subs: [
        { key: 'employeeAccount', link: '/app/account/employeeAccount', title: '员工账号', component: 'EmployeeAccount' },
        { key: 'customerAccount', link: '/app/account/customerAccount', title: '客户账号', component: 'CustomerAccount' },
        { key: 'supplierAccount', link: '/app/account/supplierAccount', title: '平台账号', component: 'SupplierAccount' }
      ]
    },
    {
      key: 'vOddJobs',
      link: '/app/vOddJobs',
      title: 'V零工',
      icon: 'unordered-list',
      subs: [
        { key: 'sendOrder', link: '/app/vOddJobs/sendOrder', title: '派单管理', component: 'SendOrder' }
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
    {
      key: 'aside',
      link: '/app/aside',
      title: '其他/范例',
      icon: 'tool',
      subs: [
        { key: 'todo', link: '/app/todo', title: 'todo', icon: 'build', component: 'Todo' },
        { key: 'gaojie1', link: '/app/gaojie1', title: '高阶组件1', icon: 'tool', component: 'Gaojie1', hidden: true },
        { key: 'gaojie2', link: '/app/gaojie2', title: '高阶组件2', icon: 'tool', component: 'Gaojie2', hidden: true }
      ]
    },
  ],
  others: [
    { key: 'about', link: '/app/about', title: '关于我', icon: 'about', component: 'About' }
  ], // 非菜单相关路由
};

export default menus;
