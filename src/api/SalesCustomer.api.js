import http from '@/axios/http.js'

export default class SalesCustomerApi {
  // 数据统计汇总
  static getStatsTotal = (data) => http.post('/SalesCustomer/GetStatsTotal', data)
}