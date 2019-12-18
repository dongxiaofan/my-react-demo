import http from '@/axios/http.js'

export default class EmployeesApi {
  // 获取员工花名册列表
  static getEmployeeListNew = (data) => http.post('/Employee/GetEmployeeListNew', data)

  // 删除员工
  static deleteEmployee = (data) => http.delete('/Employee/DeleteEmployee', data)

  // 离职
  static employeeDimission = (data) => http.delete('/Employee/EmployeeDimission', data)

  // 获取单个员工基本信息
  static getEmployee = (data) => http.postParams('/Employee/GetEmployee', data)

  // 添加或修改员工信息
  static postEmployee = (data) => http.post('/Employee/PostEmployee', data)

  // 导出员工数据
  static exportEmployees = (data) => http.post('/Employee/ExportEmployees', data)
}