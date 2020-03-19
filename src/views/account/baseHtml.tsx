import React, {Component} from 'react'
import { Form, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
import UserApi from '@/api/User.api'
import { AccountThead } from './tableHead'
import BatchImportModal from './modal/batchImportModal'
import CreateAccountModal from './modal/createAccountModal'

const { Option } = Select
const { Column, ColumnGroup } = Table

const thead = AccountThead
const arrListDown:any = {
  policysupport: []
}
const formItem = [
  { type: 'input', label: '账号名称', placeholder: '请输入账号名称', model: 'name' },
  { type: 'input', label: '登陆名称', placeholder: '请输入登陆名称', model: 'userName' },
  { type: 'input', label: '手机号码', placeholder: '请输入手机号码', model: 'phone' }
]

class BaseHtml extends Component<any,any> {
  constructor(props:any) {
    super(props)
    console.log('🌈 this.props: ', this.props)
  };

  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    const action:any = {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="mr-10" onClick={() => this.props.handleShowCreateAccountModal(record)}>编辑</a>
          {
            record.enabled ?
            <a onClick={() => this.props.enabledList(record.id, false)}>禁用</a>
            :
            <a onClick={() => this.props.enabledList(record.id, true)}>启用</a>
          }
        </span>
      )
    }
    const columns = thead.concat(action)

    let {formData, selectedRowKeys, tableData, tableComone} = this.props.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.props.onSelectChange
    }

    return (
      <div className="clearfix">
        <div className="search-form clearfix mb-20">
          <Form {...formItemLayout}>
            {formItem.map(item => {
              return (
                <Col span={6} key={item.model}>
                  <Form.Item label={item.label}>
                    <Input allowClear placeholder={item.placeholder} name={item.model} value={formData[item.model]} onChange={this.props.handleInputChange.bind(this, item.model)}/>
                  </Form.Item>
                </Col>
              )
            })}
            <Col span={6} className="pt-4">
              <Button type="primary" className="ml-20" onClick={e => this.props.searchFn()}>查询</Button>
            </Col>
          </Form>
        </div>

        <div className="bg-white pl-20 pr-20">
          <div className="table-operations">
            <div className="table-operations-left-test pull-left">合计<span className="text-danger pl-4 pr-4">{this.props.state.tableComone.totalRows}</span>条</div>
            <div className="pull-right pt-18">
              <Button type="primary" ghost className="mr-10" onClick={() => this.props.handleShowBatchImportModal()}>导入</Button>
              <Button type="primary" className="mr-10" onClick={() => this.props.handleShowCreateAccountModal({})}>新增</Button>
              <Button type="primary" ghost className="mr-10" onClick={() => this.props.enabledList(selectedRowKeys.join(','), true)} disabled={selectedRowKeys.length <= 0}>启用</Button>
              <Button type="danger" ghost className="mr-10" onClick={() => this.props.enabledList(selectedRowKeys.join(','), false)} disabled={selectedRowKeys.length <= 0}>禁用</Button>
              <Popconfirm
                title="是否确定删除？"
                onConfirm={(e)=>this.props.isSureDelete()}
                okText="确认"
                cancelText="取消"
                className="mr-10"
              >
                <Button type="danger" ghost disabled={selectedRowKeys.length <= 0}>删除</Button>
              </Popconfirm>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey={record => record.id}
            pagination={{total: tableComone.totalRows}}
            onChange={(e:any) => this.props.handleTableChange(e)}
            rowSelection={rowSelection}
          >
          </Table>
        </div>

        {/* 弹窗 */}
        {/* <BatchImportModal onRef={(ref) => this.onRef(ref, 'batchImportModal')} />
        <CreateAccountModal onRef={(ref) => this.onRef(ref, 'createAccountModal')} /> */}
      </div>
    )
  }
}

export default BaseHtml