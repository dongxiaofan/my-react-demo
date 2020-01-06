/**
 * 路由页面出口文件
 */
import Home from './home/home';
import NotFound from './aside/NotFound';
import About from './aside/about';
import Roster from './customer/roster/rosterList';
import RosterDetail from './customer/roster/rosterDetail';
import PolicySupportList from './policySupport/policySupportList';
import WorkPlan from './dailyManage/workPlan/workPlan';
import EmployeeAccount from './customer/account/employeeAccount';

export default {
    Home,    
    NotFound,
    About,
    Roster,
    RosterDetail,
    PolicySupportList,
    WorkPlan,
    EmployeeAccount
} as any;
