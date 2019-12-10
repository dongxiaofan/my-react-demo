import React, {Component} from 'react'
import { Form, Col, Select, Input, Table, Button } from 'antd'
import EmployeesApi from '@/api/Employees.api'
import { rosterListThead } from './tableHead'

const { Option } = Select
const thead = rosterListThead
const arrListDown = {
  isBeHiring: [{ label: '在职', value: 'true' }, { label: '离职', value: 'false' }]
}
const formItem = [
  {type: 'input', key: 'name', label: '姓名', placeholder: '请输入姓名'},
  {type: 'select', key: 'beHiring', label: '在职状态', placeholder: '请输入在职状态', options: 'isBeHiring'},
  {type: 'input', key: 'companyName', label: '公司名称', placeholder: '请输入公司名称'},
  {type: 'input', key: 'idCardNo', label: '身份证号码', placeholder: '请输入身份证号码'}
]

class RosterList extends Component {
  state = {
    tableData: [],
    tableComone: {        
      pageIndex: 1, // 页码
      totalRows: 0, // 总条数
      pageSize: 10, // 当前页面展示条数
    },
    formData: {
      name: '',
      idCardNo: '',
      beHiring: '',
      companyName: ''
    }
  }

  constructor(props) {
    super(props)
    this.query()
  }

  // 查询
  async searchFn () {
    let tableComone = this.state.tableComone
    tableComone.pageIndex = 1
    await this.setState({
      tableComone
    })
    this.query()
  }

  // 点击分页
  async handleTableChange (page) {
    let tableComone = this.state
    tableComone.pageIndex = page.current
    await this.setState({
      tableComone
    })
    this.query()
  }
  
  // 获取列表数据
  async query () {
    let tableComone = this.state.tableComone
    var params = {
      isDue: false,
      isRetire: false,
      name: this.state.formData.name,
      idCardNo: this.state.formData.idCardNo,
      companyName: this.state.formData.companyName,
      hRName: '',
      beHiring: this.state.formData.beHiring,
      hasPaging: true,
      pageIndex: tableComone.pageIndex,
      pageSize: tableComone.pageSize,
      orderBy: '',
      asc: true
    }
    let res = await EmployeesApi.getEmployeeListNew(params)
    if (res.code === 200 && res.success) {
      tableComone.totalRows = res.totalRows
      this.setState({
        tableData: res.data,
        tableComone
      })
    }
  }

  // 下拉框改变
  async handleSelectChange (value, key) {
    let formData = this.state.formData
    formData[key] = value
    await this.setState({
      formData
    })
  }

  // 输入框数据双向绑定
  async handleInputChange (key, e) {
    let formData = this.state.formData
    formData[key] = e.target.value
    await this.setState({
      formData
    })
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <div className="cont-wrap">
        <div className="search-form clearfix mb-20">
          <Form {...formItemLayout}>
            {formItem.map(item => {
              if (item.type === 'select') {
                return (
                  <Col span={8} key={item.key}>
                    <Form.Item label={item.label}>
                      {/* <Select defaultValue="" onChange={this.handleSelectChange(item.key)}> */}
                      <Select allowClear defaultValue="" onChange={(e) => this.handleSelectChange(e, item.key)}>
                        {arrListDown[`${item.options}`].map(ops => {
                          return (
                            <Option key={ops.value} value={ops.value}>{ops.label}</Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                )} else {
                  return (
                    <Col span={8} key={item.key}>
                      <Form.Item label={item.label}>
                        <Input allowClear placeholder={item.placeholder} name={item.key} value={this.state.formData[item.key]} onChange={this.handleInputChange.bind(this, item.key)}/>
                      </Form.Item>
                    </Col>
                  )
                }
            })}
            <Col span={6} className="pt-4">
              <Button type="primary" className="ml-20" onClick={(e) => this.searchFn(e)}>查询</Button>
            </Col>
          </Form>
        </div>

        <div className="bg-white pl-20 pr-20">
          <div className="table-operations">
            <div className="table-operations-left-test">合计<span className="text-danger">{this.state.tableComone.totalRows}</span>条</div>
          </div>
          <Table
            columns={thead}
            dataSource={this.state.tableData}
            rowKey={record => record.id}
            pagination={{total: this.state.tableComone.totalRows}}
            onChange={(e) => this.handleTableChange(e)}
          />
        </div>
      </div>
    )
  }
}

export default RosterList

