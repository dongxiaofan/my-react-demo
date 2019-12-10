import http from '@/axios/http.js'

export default class DemoApi {
  // 查询所有省份
  static getProvince = (data) => http.get('/api/ToolCommon.ashx?action=selectprovicelist', data)
}