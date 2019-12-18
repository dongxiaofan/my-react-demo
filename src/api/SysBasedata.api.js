import http from '@/axios/http.js'

export default class SysBasedataApi {
  // 数据字典
  static getSelectValueList = (data) => http.get('/SysBasedata/GetSelectValueList', data)
}