import React, {Component} from 'react'
import { Form, Col, Select, Input, Table, Button, Popconfirm, message, DatePicker } from 'antd'
import PolicySupportApi from '@/api/PolicySupport.api'
import { PolicySupportThead } from './tableHead'
import { Link, withRouter} from "react-router-dom"
import tool from '@/lib/tool'
import moment from 'moment'

const { Option } = Select
const { Column, ColumnGroup } = Table

const thead = PolicySupportThead
const arrListDown:any = {
  policysupport: []
}
const formItem = [
  { type: 'input', label: '文件名称', placeholder: '请输入文件名称', model: 'fileName' },
  { type: 'input', label: '创建人', placeholder: '请输入创建人', model: 'createrName' },
  { type: 'interval', label: '上传日期', placeholder: '请选择上传日期', placeholder1: '开始日期', placeholder2: '结束日期', model: 'createTime', model1: 'createTimeS', model2: 'createTimeE' },
  { type: 'select', label: '文件类型', placeholder: '请选择文件类型', model: 'fileType', options: 'policysupport' },
]

class policySupportList extends Component<any,any> {
  state:any = {
    tableData: [],
    tableComone: {        
      pageIndex: 1, // 页码
      totalRows: 0, // 总条数
      pageSize: 10, // 当前页面展示条数
    },
    formData: {
      fileName: '',
      createrName: '',
      createTimeS: '',
      createTimeE: '',
      fileType: ''
    },
    endOpen: false
  }

  constructor(props:any) {
    super(props)
    console.log('policySupportList props 🧞‍ ', props)
    this.getEnum()
    this.query()
  }

  // 数据字典
  getEnum () {
    let groupName = 'policysupport'
    tool.getEnum2(groupName, arrListDown)
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
      fileName: this.state.formData.fileName,
      createrName: this.state.formData.createrName,
      createTimeS: this.state.formData.createTimeS,
      createTimeE: this.state.formData.createTimeE,
      fileType: this.state.formData.fileType,
      hasPaging: true,
      pageIndex: tableComone.pageIndex,
      pageSize: tableComone.pageSize
    }
    let res = await PolicySupportApi.getPolicySupportList(params)
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

  // 时间选择
  async handleDatePickerChange (date, dateString, model) {
    let formData = this.state.formData
    formData[model] = dateString
    await this.setState({
      formData
    })
  }

  // 起始时间选择 start
  disabledStartDate = createTimeS => {
    const { createTimeE } = this.state.formData;
    if (!createTimeS || !createTimeE) {
      return false;
    }
    return createTimeS.valueOf() > createTimeE.valueOf();
  };

  disabledEndDate = createTimeE => {
    const { createTimeS } = this.state.formData;
    if (!createTimeE || !createTimeS) {
      return false;
    }
    return createTimeE.valueOf() <= createTimeS.valueOf();
  };

  dateOnChange = (field, value) => {
    const formData = this.state.formData
    formData[field] = value
    this.setState({
      formData
    });
  };

  dateOnStartChange = value => {
    this.dateOnChange('createTimeS', value)
  };

  onEndChange = value => {
    this.dateOnChange('createTimeE', value)
  };

  handleDateStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleDateEndOpenChange = open => {
    this.setState({ endOpen: open });
  }
  // 起始时间选择 end


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
          <a className="mr-10">重命名</a>
          <a>下载</a>
        </span>
      )
    }
    const columns = thead.concat(action)
    const { formData, endOpen } = this.state
    return (
      <div className="cont-wrap">
        <div className="search-form clearfix mb-20">
          <Form {...formItemLayout}>
            {formItem.map(item => {
              if (item.type === 'select') {
                return (
                  <Col span={8} key={item.model}>
                    <Form.Item label={item.label}>
                      <Select allowClear onChange={(e:any) => this.handleSelectChange(e, item.model)}>
                        {arrListDown[`${item.options}`].map((ops:any) => {
                          return (
                            <Option key={ops.value} value={ops.value}>{ops.label}</Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                )} else if (item.type === 'interval') {
                  return (
                    <Col span={8} key={item.model}>
                      <Form.Item label={item.label}>
                        <DatePicker
                          disabledDate={this.disabledStartDate}
                          showTime
                          format="YYYY-MM-DD"
                          placeholder="开始时间"
                          onChange={this.dateOnStartChange}
                          onOpenChange={this.handleDateStartOpenChange}
                        />
                        <span> 至 </span>
                        <DatePicker
                          disabledDate={this.disabledEndDate}
                          showTime
                          format="YYYY-MM-DD"
                          placeholder="结束时间"
                          onChange={this.onEndChange}
                          open={endOpen}
                          onOpenChange={this.handleDateEndOpenChange}
                        />
                      </Form.Item>
                    </Col>
                  )
                } else {
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
            <div className="table-operations-left-test pull-left">合计<span className="text-danger">{this.state.tableComone.totalRows}</span>条</div>
            <div className="pull-right pt-18">
              <Button type="primary" className="mr-10">文件上传</Button>
              <Button type="danger" ghost className="mr-10">删除</Button>
              <Button type="primary" className="mr-10">新建文件夹</Button>
              <Button type="primary" ghost className="mr-10">文件共享</Button>
              <Button className="">取消共享</Button>
            </div>
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

// export default policySupportList
export default withRouter(policySupportList)

