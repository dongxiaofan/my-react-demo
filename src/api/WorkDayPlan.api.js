import http from '@/axios/http.js'

export default class WorkDayPlanApi {
  // 根据用户ID+日期获取本周工作计划+当天工作计划
  static getPlan = (data) => http.post('/WorkDayPlan/GetPlan', data)

  // 保存工作计划
  static savePlan = (data) => http.post('/WorkDayPlan/SavePlan', data)

  // 根据用户ID+类型+日期修改日工作计划指定信息
  static updatePlan = (data) => http.post('/WorkDayPlan/UpdatePlan', data)

  // 根据用户ID获取可见用户列表
  static getUserList = (data) => http.getData('/WorkDayPlan/GetUserList', data)
}