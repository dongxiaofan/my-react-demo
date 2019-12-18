import React, {Component} from 'react'
import { Form, Col, Select, Input, Table, Button, Popconfirm, message } from 'antd'
import EmployeesApi from '@/api/Employees.api'
import { rosterListThead } from './tableHead'
import { Link, withRouter} from "react-router-dom"

// type QueryParamsProps = {
//   query: any;
// };

const { Option } = Select
const { Column, ColumnGroup } = Table

const thead = rosterListThead
const arrListDown:any = {
  isBeHiring: [{ label: '在职', value: 'true' }, { label: '离职', value: 'false' }]
}
const formItem = [
  {type: 'input', label: '姓名', placeholder: '请输入姓名', model: 'name' },
  {type: 'select', label: '在职状态', placeholder: '请输入在职状态', model: 'beHiring', options: 'isBeHiring'},
  {type: 'input', label: '公司名称', placeholder: '请输入公司名称', model: 'companyName' },
  {type: 'input', label: '身份证号码', placeholder: '请输入身份证号码', model: 'idCardNo'}
]

class RosterList extends Component<any,any> {
  state:any = {
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

  constructor(props:any) {
    super(props)
    console.log('RosterList props 🧞‍ ', props)
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
  async handleTableChange (page:any) {
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
  async handleSelectChange (value:any, key:any) {
    let formData = this.state.formData
    formData[key] = value
    await this.setState({
      formData
    })
  }

  // 输入框数据双向绑定
  async handleInputChange (key, e) {
    console.log('💀 key: ', key, ', 💀 e: ', e)
    let formData = this.state.formData
    formData[key] = e.target.value
    await this.setState({
      formData
    })
  }

  // 去往详情
  goDetail (row, isEdit):any {
    if (isEdit) {
      this.props.history.push('/app/roster/rosterDetail?id=' + row.id + '&isEdit=true')
    } else {      
      this.props.history.push('/app/roster/rosterDetail?id=' + row.id)
    }
  }

  async isSureDelete (record) {
    console.log('🧞‍ 点击了确认删除: ', record)
    let res = await EmployeesApi.deleteEmployee({ id: record.id })
      console.log('res: ', res)
      if (res.code === 200 && res.success) {
        message.success(res.message)
        this.query()
      } else {
        message.error({
          content: res.message,
          // duration: 0,
          closable: true
        })
      }
  };


  render () {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    var action:any = {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="mr-10" onClick={(e)=>this.goDetail(record, false)}>详情</a>
          <a className="mr-10" onClick={(e)=>this.goDetail(record, true)}>编辑</a>
          {/* <a onClick={(e)=>this.isDeleteModal(record)}>删除</a> */}
          <Popconfirm
            title="是否确定删除？"
            onConfirm={(e)=>this.isSureDelete(record)}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </span>
      )
    }
    const columns = thead.concat(action)
    return (
      <div className="cont-wrap">
        <div className="search-form clearfix mb-20">
          <Form {...formItemLayout}>
            {formItem.map(item => {
              if (item.type === 'select') {
                return (
                  <Col span={8} key={item.model}>
                    <Form.Item label={item.label}>
                      <Select allowClear defaultValue="" onChange={(e:any) => this.handleSelectChange(e, item.model)}>
                        {arrListDown[`${item.options}`].map((ops:any) => {
                          return (
                            <Option key={ops.value} value={ops.value}>{ops.label}</Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                )} else {
                  return (
                    <Col span={8} key={item.model}>
                      <Form.Item label={item.label}>
                        <Input allowClear placeholder={item.placeholder} name={item.model} value={this.state.formData[item.model]} onChange={this.handleInputChange.bind(this, item.model)}/>
                      </Form.Item>
                    </Col>
                  )
                }
            })}
            <Col span={6} className="pt-4">
              <Button type="primary" className="ml-20" onClick={e => this.searchFn()}>查询</Button>
            </Col>
          </Form>
        </div>

        <div className="bg-white pl-20 pr-20">
          <div className="table-operations">
            <div className="table-operations-left-test">合计<span className="text-danger">{this.state.tableComone.totalRows}</span>条</div>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.tableData}
            rowKey={record => record.id}
            pagination={{total: this.state.tableComone.totalRows}}
            onChange={(e:any) => this.handleTableChange(e)}
          >
          </Table>
        </div>
      </div>
    )
  }
}

// export default RosterList
export default withRouter(RosterList)

