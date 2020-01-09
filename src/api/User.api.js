import http from '@/axios/http.js'

export default class UserApi {
  // 根据条件获取用户信息
  static getList = (data) => http.post('/User/GetList', data)

  // 根据ID获取用户信息
  static getModel = (data) => http.get('/User/GetModel', data)

  // 保存用户信息
  static save = (data) => http.post('/User/Save', data)

  // 启用/禁用用户信息
  static enabledList = (data) => http.post('/User/EnabledList', data)

  // 删除用户信息
  static delete = (data) => http.post('/User/Delete', data)

  // 修改密码
  static updatePassword = (data) => http.post('/User/UpdatePassword', data)

  // 导入
  static import = (data) => http.post('/User/Import', data)

  // 导出模板
  static exportTemplate = (data) => http.get('/User/ExportTemplate', data)

  // 下载错误数据
  static exportErrorFile = (data) => http.get('/User/ExportErrorFile', data)

  // 创建VXCore账户
  static createAccountForVX = (data) => http.get('/User/CreateAccountForVX', data)
}