import React, {Component} from 'react'
import { Form, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
import PolicySupportApi from '@/api/PolicySupport.api'
import { PolicySupportThead } from './tableHead'
import { Link, withRouter} from "react-router-dom"
import tool from '@/lib/tool'
import moment from 'moment'
import ReNameModal from './modal/reNameModal'
import CreateFileModal from './modal/createFileModal'
import ImportModal from './modal/importModal'
import OrganizationUnitTreeModal from './modal/organizationUnitTreeModal'

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
    endOpen: false,
    currentRow: '',
    currentFolder: [],
    PSID: 'local',
    selectedRowKeys: []
  };

  constructor(props:any) {
    super(props)
    this.getEnum()
    this.query()
  };

  reNameModal: any;
  importModal: any;
  organizationUnitTreeModal: any;
  createFileModal: any;
  onRef = (ref, modal) => { // -> 获取整个Child元素
    this[modal] = ref
  };

  // 数据字典
  getEnum () {
    let groupName = 'policysupport'
    tool.getEnum2(groupName, arrListDown)
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
    let tableComone = this.state
    tableComone.pageIndex = page.current
    await this.setState({
      tableComone
    })
    this.query()
  };
  
  // 获取列表数据
  async query () {
    let {initTableData, tableData, tableComone, currentFolder, selectedRowKeys} = this.state
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
      initTableData = res.data
      tableData = res.data
      selectedRowKeys = []      

      this.setState({
        initTableData,
        tableData,
        tableComone,
        selectedRowKeys
      })

      console.log('🐻🐻🐻 query - currentFolder：', currentFolder)
      res.data.map(row => {
        row.downLoadUrl = '/api/PolicySupport/DownloadFile?id=' + row.id
        if (currentFolder.length > 0) {
          var parentId = currentFolder[currentFolder.length - 1].parentId
          var fileName = currentFolder[currentFolder.length - 1].fileName
          this.handleChangeFolder(currentFolder.length - 1, parentId, fileName)
        }
      })
    }
  };

  // 下拉框改变
  async handleSelectChange (value:any, key:any) {
    let formData = this.state.formData
    formData[key] = value
    await this.setState({
      formData
    })
  };

  // 输入框数据双向绑定
  async handleInputChange (key, e) {
    let formData = this.state.formData
    formData[key] = e.target.value
    await this.setState({
      formData
    })
  };

  // 时间选择
  async handleDatePickerChange (date, dateString, model) {
    let formData = this.state.formData
    formData[model] = dateString
    await this.setState({
      formData
    })
  };

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
  };
  // 起始时间选择 end

  // 下载
  handleDownloadFile = (id) => {
    PolicySupportApi.downloadFile({ id: id }).then(res => {
      if (res.code === 200 && res.success) {
        window.open(res.message, '_blank')
      } else {
        message.error(res.message)
      }
    })
  };

  // 回到根目录
  backInitTable () {
    this.setState({
      tableData: this.state.initTableData,
      currentFolder: [],
      PSID: 'local'
    })
  };

  // 打开文件夹
  handleFolder = (row) => {
    let {currentFolder, tableData, initTableData} = this.state
    let folderItem = {
      fileName: row.fileName,
      parentId: row.id,
      type: row.type
    }
    currentFolder.push(folderItem)
    tableData = row.childs
    this.setState({
      tableData,
      currentFolder
    })
    this.changePSID(this.state.currentFolder)
  };

  handleChangeFolder = (folderIndex, parentId, fileName) => {
    let { currentFolder, initTableData } = this.state
    currentFolder.length = folderIndex + 1
    this.setState({
      currentFolder
    })
    this.getParents(initTableData, parentId)
    this.changePSID(currentFolder)
  };

  // 查找父级
  getParents (data, id) {
    for (var i in data) {
      if (data[i].id == id) {
        this.state.tableData = data[i].childs
        return data[i].childs
      }
      if (data[i].childs) {
        var ro = this.getParents(data[i].childs, id)
        if (ro !== undefined) {
          return ro.concat(data[i].id)
        }
      }
    }
  };

  changePSID = (currentFolder) => {
    this.setState({
      PSID: currentFolder[currentFolder.length - 1].parentId
    })
  };

  // 确认批量删除
  isSureDelete = () => {
    PolicySupportApi.deletePolicySupport(this.state.selectedRowKeys).then(res => {
      message.success(res.message)
      this.query()
    }).catch(err => {
      message.error(err.message)
    })
  };

  // 表格选择改变
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  // 重命名-显示弹窗
  handleShowReNameModal = (id) => {
    this.reNameModal.showModal(id) // -> 通过this.child可以拿到child所有状态和方法
  };

  // 文件上传-显示弹窗
  handleShowImportModal = () => {
    this.importModal.showModal()
  };

  // 文件共享-显示弹窗
  handleShowOrganizationUnitTreeModal = () => {
    this.organizationUnitTreeModal.showModal()
  };  

  // 确认批量取消共享
  isSureUnFileShare = () => {
    PolicySupportApi.unFileShare({ids: this.state.selectedRowKeys}).then(res => {
      message.success(res.message)
      this.query()
    }).catch(err => {
      message.error(err.message)
    })
  };

  // 新建文件夹-显示弹窗
  handleShowCreateFileModal = () => {
    this.createFileModal.showModal()
  };

  render () {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const fileName:any = {
      title: '文件名',
      key: 'fileName',
      render: (record: any, index: number) => {
        return record.type === 2 ? (
          <a onClick={() => this.handleFolder(record)}>
            <Icon type="folder-open" theme="filled" className="pr-10 font-24 text-warning" />
            <span>{record.fileName}</span>
          </a>
        ) : <span>{record.fileName}</span>
      }
    }
    const action:any = {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="mr-10" onClick={() => this.handleShowReNameModal(record.id)}>重命名</a>
          <a onClick={() => this.handleDownloadFile(record.id)}>下载</a>
        </span>
      )
    }
    const columns = thead.concat(fileName, action)
    // const columns = [...fileName, ...thead, ...action]
    const { formData, endOpen, selectedRowKeys } = this.state  

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
      // onChange: (selectedRowKeys) => {
      //   console.log(`selectedRowKeys: ${selectedRowKeys}`)
      //   this.setState({
      //     selectedRowKeys: selectedRowKeys
      //   })
      // }
    }

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
            {/* <div className="table-operations-left-test pull-left">合计<span className="text-danger">{this.state.tableComone.totalRows}</span>条</div> */}
            <div className="table-operations-left-test pull-left">
              <div className="pull-left">
                <a onClick={() => this.backInitTable()}>根目录</a>
                <Icon type="right" className="font-12 pl-4 pr-4"/>
              </div>
              {
                this.state.currentFolder.map((folder,folderIndex) => {
                  return (
                    folderIndex !== this.state.currentFolder.length - 1 ?
                    <div className="pull-left" key={folder['fileName']} onClick={() => this.handleChangeFolder(folderIndex, folder.parentId, folder.fileName)}>
                      <a>{folder.fileName}</a>
                      <Icon type="right" className="font-12 pl-4 pr-4"/>
                    </div>
                    :
                    <div className="pull-left" key={folder['fileName']}>
                      <span>{folder.fileName}</span>
                    </div>
                  )
                })
              }
            </div>
            <div className="pull-right pt-18">
              <Button type="primary" className="mr-10" onClick={() => this.handleShowImportModal()}>文件上传</Button>
              {/* <Button type="danger" ghost className="mr-10" disabled={this.state.selectedRowKeys.length <= 0}>删除</Button> */}
              <Popconfirm
                title="是否确定删除？"
                onConfirm={(e)=>this.isSureDelete()}
                okText="确认"
                cancelText="取消"
                className="mr-10"
              >
                <Button type="danger" ghost disabled={this.state.selectedRowKeys.length <= 0}>删除</Button>
              </Popconfirm>
              <Button type="primary" className="mr-10" onClick={() => this.handleShowCreateFileModal()}>新建文件夹</Button>
              <Button type="primary" ghost className="mr-10" disabled={this.state.selectedRowKeys.length <= 0} onClick={() => this.handleShowOrganizationUnitTreeModal()}>文件共享</Button>
              {/* <Button className="" disabled={this.state.selectedRowKeys.length <= 0}>取消共享</Button> */}
              <Popconfirm
                title="是否取消共享？"
                onConfirm={(e)=>this.isSureUnFileShare()}
                okText="确认"
                cancelText="取消"
                className="mr-10"
              >
                <Button type="danger" ghost disabled={this.state.selectedRowKeys.length <= 0}>取消共享</Button>
              </Popconfirm>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.tableData}
            rowKey={record => record.id}
            pagination={{total: this.state.tableComone.totalRows}}
            onChange={(e:any) => this.handleTableChange(e)}
            rowSelection={rowSelection}
          >
          </Table>
        </div>
      
        {/* 弹窗 */}
        <ReNameModal onRef={(ref) => this.onRef(ref, 'reNameModal')} query={this.searchFn} />
        <ImportModal onRef={(ref) => this.onRef(ref, 'importModal')} query={this.searchFn} PSID={this.state.PSID}/>
        <OrganizationUnitTreeModal onRef={(ref) => this.onRef(ref, 'organizationUnitTreeModal')} query={this.searchFn} ids={this.state.selectedRowKeys}/>
        <CreateFileModal onRef={(ref) => this.onRef(ref, 'createFileModal')} query={this.searchFn} PSID={this.state.PSID}/>
      </div>
    )
  }
}

// export default policySupportList
export default withRouter(policySupportList)

