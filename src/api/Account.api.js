import http from '@/axios/http.js'

export default class AccountApi {
  // 登陆
  static login = (data) => http.post('/account/login', data)
}