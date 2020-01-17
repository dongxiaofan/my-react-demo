import http from '@/axios/http.js'

export default class ReceivableBillApi {
  // 获取应收账单管理列表数据
  static getReceivableBillList = (data) => http.post('/ReceivableBill/GetReceivableBillList', data)

  // 导入到款
  static importReceivableBill = (data) => http.post('/ReceivableBill/ImportReceivableBill', data)

  // 导出应收账单列表
  static exportReceivableBill = (data) => http.post('/ReceivableBill/ExportReceivableBill', data)

  // 获取到款项目
  static getReceiveProgramNames = (data) => http.get('/ReceivableBill/GetReceiveProgramNames', data)

  // 获取差额所属项目
  static getBalanceProgramNames = (data) => http.get('/ReceivableBill/GetBalanceProgramNames', data)

  // 获取差额所属编号
  static getBalanceNos = (data) => http.get('/ReceivableBill/getBalanceNos', data)

  // 添加应付账单信息
  static postReceivableBill = (data) => http.post('/ReceivableBill/PostReceivableBill', data)

  // 获取应到合计
  static getShouldArriveTotal = (data) => http.post('/ReceivableBill/GetShouldArriveTotal', data)

  // 获取实到明细列表
  static getReceivableBillDetailList = (data) => http.post('/ReceivableBill/GetReceivableBillDetailList', data)

  // 获取应到明细列表
  static getShouldArriveDetailList = (data) => http.post('/ReceivableBill/GetShouldArriveDetailList', data)

  // 银行到款管理
  static bankReceivableBill = (data) => http.post('/ReceivableBill/BankReceivableBill', data)

  // 导出银行到款列表
  static exportBankReceivableBill = (data) => http.post('/ReceivableBill/ExportBankReceivableBill', data)

  // 获取到款银行下拉选项
  static getCompanyBankInfos = (data) => http.get('/ReceivableBill/GetCompanyBankInfos', data)

  // 添加应收账单差额说明
  static postReceivableBalanceLog = (data) => http.post('/ReceivableBill/PostReceivableBalanceLog', data)

  // 获取应收账单展开明细
  static getReceivableBillListDetail = (data) => http.post('/ReceivableBill/GetReceivableBillListDetail', data)

  // 应收差额说明列表
  static getBalanceRemarks = (data) => http.post('/ReceivableBill/GetBalanceRemarks', data)

  // 获取差额所属项目
  static getBalanceProgramNames = (data) => http.get('/ReceivableBill/GetBalanceProgramNames', data)

  // 获取差额处理列表
  static getBalanceRemarksLog = (data) => http.post('/ReceivableBill/GetBalanceRemarksLog', data)

  // 导出收款单
  static exportCollectionDocReceived = (data) => http.post('/ReceivableBill/ExportCollectionDocReceived', data)

  // 资金流列表
  static cashFlowList = (data) => http.post('/ReceivableBill/CashFlowList', data)

  // 导出现金流
  static exportCashFlow = (data) => http.post('/ReceivableBill/ExportCashFlow', data)

  // 资金流明细
  static cashFlowDetailList = (data) => http.post('/ReceivableBill/CashFlowDetailList', data)

  // 导出资金流明细
  static exportCashFlowDetail = (data) => http.post('/ReceivableBill/ExportCashFlowDetail', data)
}