import React, {Component} from 'react'
import { Form, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
import UserApi from '@/api/User.api'
import BatchImportModal from './modal/batchImportModal'
import CreateAccountModal from './modal/createAccountModal'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
    };

    state = {
      powerType: 'abcdefg',
      tableData: [],
      tableComone: {        
        pageIndex: 1, // 页码
        totalRows: 0, // 总条数
        pageSize: 10, // 当前页面展示条数
      },
      formData: {
        name: '',
        userName: '',
        phone: ''
      },
      endOpen: false,
      currentRow: {},
      selectedRowKeys: []
    };

    batchImportModal;
    createAccountModal;
    onRef = (ref, modal) => { // -> 获取整个Child元素
      this[modal] = ref
    };

    getEnhancedState = (enhancedState) => {
      Object.keys(enhancedState).forEach(key => {
        this.state[key] = enhancedState[key]
      })
      this.query()
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
    handleTableChange = (page) => {
      let {tableComone} = this.state
      tableComone.pageIndex = page.current
      this.setState({
        tableComone
      })
      this.query()
    };
    
    // 获取列表数据
    query = () => {
      let {tableData, tableComone, currentFolder, selectedRowKeys, formData, powerType} = this.state
      // this.state.powerType = queryPowerType
      console.log('🥁 this.state: ', this.state)
      var params = {
        Name: formData.name,
        UserName: formData.userName,
        Phone: formData.phone,
        PowerType: powerType,
        hasPaging: true,
        pageIndex: tableComone.pageIndex,
        pageSize: tableComone.pageSize
      }
      UserApi.getList(params).then(res => {
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
      })
    };

    // 表格选择改变
    onSelectChange = (selectedRowKeys) => {
      this.setState({ selectedRowKeys });
    };

    // 输入框数据双向绑定
    handleInputChange = (key, e) => {
      let formData = this.state.formData
      formData[key] = e.target.value
      this.setState({
        formData
      })
    };

    // 确认批量删除
    isSureDelete = () => {
      UserApi.delete({id: this.state.selectedRowKeys.join(',')}).then(res => {
        message.success(res.message)
        this.query()
      }).catch(err => {
        message.error(err.message)
      })
    };

    // 导入-显示弹窗
    handleShowBatchImportModal = () => {
      this.batchImportModal.showModal()
    };

    // 新建/编辑-显示弹窗
    handleShowCreateAccountModal = (row) => {
      console.log('显示弹窗 row: ', row)
      this.createAccountModal.showModal()
      this.createAccountModal.getModel(row.id)
    };

    // 启用/禁用
    enabledList = (id, enabled) => {
      var params = {
        ids: id,
        enabled: enabled
      }
      UserApi.enabledList(params).then(res => {
        if (res.success) {
          message.success(res.message)
          this.query()
        } else {
          message.error(res.message)
        }
      })
    };

    render() {
      const baseProps = {
        ...this.props,
        getEnhancedState: this.getEnhancedState,
        searchFn: this.searchFn,
        handleTableChange: this.handleTableChange,
        query: this.query,
        onSelectChange: this.onSelectChange,
        handleInputChange: this.handleInputChange,
        isSureDelete: this.isSureDelete,
        handleShowBatchImportModal: this.handleShowBatchImportModal,
        handleShowCreateAccountModal: this.handleShowCreateAccountModal,
        enabledList: this.enabledList
      };

      return (
        <div className="cont-wrap">
          {/* <p className="text-danger">HRO.JS：name {this.state.name}</p> */}
          <WrappedComponent state={this.state} baseProps={baseProps} {...this.props} {...baseProps} />
          {/* 弹窗 */}
          <BatchImportModal onRef={(ref) => this.onRef(ref, 'batchImportModal')} query={this.searchFn} />
          <CreateAccountModal onRef={(ref) => this.onRef(ref, 'createAccountModal')} query={this.searchFn} />
        </div>
      )
    }
  }
}