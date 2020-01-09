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
import EmployeeAccount from './account/employeeAccount';
import CustomerAccount from './account/customerAccount';
import SupplierAccount from './account/supplierAccount';
import SendOrder from './vOddJobs/sendOrder';
import Todo from './example/todo';
import Gaojie1 from './example/gaojie1';
import Gaojie2 from './example/gaojie2';

export default {
    Home,    
    NotFound,
    About,
    Roster,
    RosterDetail,
    PolicySupportList,
    WorkPlan,
    EmployeeAccount,
    CustomerAccount,
    SupplierAccount,
    SendOrder,
    Todo,
    Gaojie1,
    Gaojie2
} as any;
