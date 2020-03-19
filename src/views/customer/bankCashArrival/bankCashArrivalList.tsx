import React, {Component} from 'react'
import { Form, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
import ReceivableBillApi from '@/api/ReceivableBill.api'
import { BankCashArrivalThead } from './tableHead'
import config from '@/axios/config'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { MonthPicker } = DatePicker

const { Option } = Select
const { Column, ColumnGroup } = Table
const thead = BankCashArrivalThead

const formItem = [
  { type: 'input', label: '客户名称', placeholder: '请输入客户名称', model: 'name' },
  { type: 'interval', label: '费用月份', placeholder: '请选择费用月份', placeholder1: '开始日期', placeholder2: '结束日期', model: 'FeeYearMonth', model1: 'FeeYearMonthStart', model2: 'FeeYearMonthEnd' },
  { type: 'interval', label: '到款日期', placeholder: '请选择到款日期', placeholder1: '开始日期', placeholder2: '结束日期', model: 'ReceiveDate', model1: 'ReceiveDateStart', model2: 'ReceiveDateEnd' },
]

class BankCashArrival extends Component<any,any> {
  constructor(props:any) {
    super(props)
    this.query()
  };

  state:any = {
    powerType: null,
    tableData: [],
    tableComone: {
      pageIndex: 1, // 页码
      totalRows: 0, // 总条数
      pageSize: 10, // 当前页面展示条数
    },
    formData: {
      companyName: '',
      insuranceName: '',
      FeeYearMonthStart: '',
      FeeYearMonthEnd: '',
      ReceiveDateStart: '',
      ReceiveDateEnd: '',
      securityNo: '',
      serverName: ''
    },
    currentRow: {},
    selectedRowKeys: []
  };

  batchImportModal: any;
  createAccountModal: any;
  onRef = (ref, modal) => { // -> 获取整个Child元素
    this[modal] = ref
  };

  // 查询
  searchFn = () => {
    let {tableComone} = this.state
    tableComone.pageIndex = 1
    this.setState({
      tableComone
    })
    this.query()
  };

  // 点击分页
  async handleTableChange (page:any) {
    let {tableComone} = this.state
    tableComone.pageIndex = page.current
    await this.setState({
      tableComone
    })
    this.query()
  };
  
  // 获取列表数据
  async query () {
    let {tableData, tableComone, currentFolder, selectedRowKeys, formData, powerType} = this.state
    var params = {
      hasPaging: true,
      pageIndex: tableComone.pageIndex,
      pageSize: tableComone.pageSize
    }
    let res = await ReceivableBillApi.bankReceivableBill({...params, ...formData})
    if (res.success) {
      tableComone.totalRows = res.totalRows
      tableData = res.data
      selectedRowKeys = []      

      this.setState({
        tableData,
        tableComone,
        selectedRowKeys
      })
    }
  };

  // 表格选择改变
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  // 日期改变
  async handleDateChange (value:any, key:any) {
    let {formData} = this.state
    formData[key] = value
    await this.setState({
      formData
    })
  };

  // 输入框数据双向绑定
  async handleInputChange (key, e) {
    let {formData} = this.state
    formData[key] = e.target.value
    await this.setState({
      formData
    })
  };

  // 导出银行到款
  exportBankReceivableBill = () => {
    ReceivableBillApi.exportBankReceivableBill(this.state.formData).then(res => {
      if (res.success) {
        window.open(config.apiUrl + res.message, '_blank')
      } else {
        message.error(res.message)
      }
    })
  };

  // 导出收款单
  exportCollectionDocReceived = () => {
    ReceivableBillApi.exportCollectionDocReceived().then(res => {
      if (res.success) {
        window.open(config.apiUrl + res.message, '_blank')
      } else {
        message.error(res.message)
      }
    })
  };

  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    const columns:any = thead

    let {formData, selectedRowKeys, tableData, tableComone} = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    return (
      <div className="cont-wrap">
        <div className="search-form clearfix mb-20">
          <Form {...formItemLayout}>
            {formItem.map(item => {
              if (item.model === 'FeeYearMonth') {
                return (
                  <Col span={7} key={item.model}>
                    <Form.Item label={item.label}>
                    <MonthPicker
                        format="YYYY-MM"
                        placeholder="开始时间"
                        onChange={(e:any) => this.handleDateChange(e, item.model1)}
                      />
                      <span> 至 </span>
                      <MonthPicker
                        format="YYYY-MM"
                        placeholder="结束时间"
                        onChange={(e:any) => this.handleDateChange(e, item.model2)}
                      />
                    </Form.Item>
                  </Col>
                )
              } else if (item.model === 'ReceiveDate') {
                return (
                  <Col span={7} key={item.model}>
                    <Form.Item label={item.label}>
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="开始时间"
                        onChange={(e:any) => this.handleDateChange(e, item.model1)}
                      />
                      <span> 至 </span>
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="结束时间"
                        onChange={(e:any) => this.handleDateChange(e, item.model2)}
                      />
                    </Form.Item>
                  </Col>
                )
              } else {
                return (
                  <Col span={5} key={item.model}>
                    <Form.Item label={item.label}>
                      <Input allowClear placeholder={item.placeholder} name={item.model} value={formData[item.model]} onChange={this.handleInputChange.bind(this, item.model)}/>
                    </Form.Item>
                  </Col>
                )
              }
            })}
            <Col span={4} className="pt-4">
              <Button type="primary" className="ml-20" onClick={e => this.searchFn()}>查询</Button>
            </Col>
          </Form>
        </div>

        <div className="bg-white pl-20 pr-20">
          <div className="table-operations">
            <div className="table-operations-left-test pull-left">合计<span className="text-danger pl-4 pr-4">{this.state.tableComone.totalRows}</span>条</div>
            <div className="pull-right pt-18">
              <Button type="primary" className="mr-10" onClick={() => this.exportBankReceivableBill()}>导出银行到款</Button>
              <Button type="primary" ghost onClick={() => this.exportCollectionDocReceived()}>导出收款单</Button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={tableData}
            // rowKey={record => record['customerGUID']}
            pagination={{total: tableComone.totalRows}}
            onChange={(e:any) => this.handleTableChange(e)}
          >
          </Table>
        </div>
      </div>
    )
  }
}

export default BankCashArrival