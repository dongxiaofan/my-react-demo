import http from '@/axios/http.js'

export default class PolicySupportApi {
  // 获取单个政策支持文件
  static getPolicySupport = (data) => http.post('/PolicySupport/GetPolicySupport', data)

  // 获取政策支持列表
  static getPolicySupportList = (data) => http.post('/PolicySupport/GetPolicySupportList', data)

  // 文件上传
  static fileUpload = (data) => http.post('/PolicySupport/FileUpload', data)

  // 删除政策支持文件
  static deletePolicySupport = (data) => http.delete('/PolicySupport/DeletePolicySupport', data)

  // 新建文件夹
  static CreateDir = (data) => http.post('/PolicySupport/CreateDir', data)

  // 下载文件
  static downloadFile = (data) => http.post('/PolicySupport/DownloadFile', data)

  // 重命名
  static reName = (data) => http.post('/PolicySupport/ReName', data)

  // 获取组织架构
  static getOrganizationUnitTree = (data) => http.get('/PolicySupport/GetOrganizationUnitTree', data)

  // 文件共享
  static fileShare = (data) => http.post('/PolicySupport/FileShare', data)

  // 取消共享
  static unFileShare = (data) => http.post('/PolicySupport/UnFileShare', data)
}