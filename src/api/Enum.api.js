import http from '@/axios/http.js'

export default class EnumApi {
  // 数据字典
  static getEnum = (data) => http.get('/Enum/Enum', data)
}