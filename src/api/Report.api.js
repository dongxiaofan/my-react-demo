import http from '@/axios/http.js'

export default class ReportApi {
  // 根据省份获取信息
  static getInfoBy = (data) => http.post('/Report/GetInfoBy', data)

  // 根据省份获取账单信息
  static getBills = (data) => http.post('/Report/GetBills', data)
}