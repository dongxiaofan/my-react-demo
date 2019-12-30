/**
 * 路由页面出口文件
 */
import Home from './home/home';
import NotFound from './aside/NotFound';
import Roster from './roster/rosterList';
import RosterDetail from './roster/rosterDetail';
import PolicySupportList from './policySupport/policySupportList';
import WorkPlan from './dailyManage/workPlan/workPlan';

export default {
    Home,    
    NotFound,
    Roster,
    RosterDetail,
    PolicySupportList,
    WorkPlan
} as any;
