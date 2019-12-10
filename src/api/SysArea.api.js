import http from '@/axios/http.js'

export default class SysAreaApi {
  // 查询所有省份
  static getProvince = (data) => http.get('/SysArea/GetProvince', data)
}