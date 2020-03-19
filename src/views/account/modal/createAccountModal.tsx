import React from 'react'
import { Modal, Form, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker, Switch } from 'antd'
import UserApi from '@/api/User.api'
import config from '@/axios/config'

const { Option } = Select
const { Column, ColumnGroup } = Table

const formItem = [
  { type: 'input', label: '账号名称', placeholder: '请输入账号名称', model: 'name', isRequired: true, isShow: true },
  { type: 'input', label: '登陆名称', placeholder: '请输入登陆名称', model: 'userName', isRequired: true, isShow: true },
  { type: 'password', label: '登陆密码', placeholder: '请输入登陆密码', model: 'password', isRequired: true, isShow: true },
  { type: 'input', label: '手机号码', placeholder: '请输入手机号码', model: 'phone', isRequired: true, isShow: true },
  { type: 'input', label: '邮箱', placeholder: '请输入邮箱', model: 'email', isRequired: false, isShow: true },
  { type: 'select', label: '所属公司', placeholder: '请选择所属公司', model: 'companyId', options: 'companyList', isRequired: true, isShow: true },
  { type: 'select', label: '所属角色', placeholder: '请选择所属角色', model: 'roleId', options: 'roleList', isRequired: true, isShow: true },
  { type: 'input', label: '安薪税用户ID', placeholder: '请输入安薪税用户ID', model: 'axsUserId', isRequired: false, isShow: true },
  { type: 'switch', label: '启用', placeholder: '请选择是否启用', model: 'enabled', isRequired: true, isShow: true }
]

class CreatAccountModal extends React.Component<any, any> {
  componentDidMount(){
    this.props.onRef(this)
    console.log(this) // ->将child传递给this.props.onRef()方法
  }
  
  state = {
    isShowCreatAccountModal: false,
    fileList: [],
    uploading: false,
    errorData: {
      errorId: '',
      isError: false,
      downLoadUrl: ''
    },
    templateDownLoadUrl: config.apiUrl + '/Content/Template/批量导入账号模板.xls?random=' + Math.floor(Math.random() * 10),
    formData: {
      id: '',
      name: '',
      userName: '',
      password: '',
      phone: '',
      email: '',
      companyId: '',
      roleId: '',
      axsUserId: '',
      enabled: true
    },
    arrListDown: {
      companyList: [],
      roleList: []
    }
  };

  emitQuery = () => { // 调用父组件方法
    this.props.query();
    console.log('🧞‍ this.props: ', this.props)
  };

  getModel = (id) => {
    let {arrListDown, formData} = this.state
    arrListDown.companyList = []

    if (id) {
      formItem.map(item => {
        if (['companyId', 'roleId'].indexOf(item.model) !== -1) {
          item['isShow'] = false
        }
      })
    } else {
      formItem.map(item => {
        item['isShow'] = true
      })
    }

    UserApi.getModel({'parameter.id': id}).then(res => {
      console.log('getModel: ', res)
      if (res.success) {
        var result = res.data
        // 所属公司
        var tempCompanyList:any = []
        result.companyList.map(item => {
          tempCompanyList.push({ value: item.id, label: item.name })
        })
        arrListDown.companyList = tempCompanyList

        // 所属角色
        var tempRoleList:any = []
        result.roleList.map(item => {
          tempRoleList.push({ value: item.key, label: item.value })
        })
        arrListDown.roleList = tempRoleList

        Object.keys(formData).forEach(key => {
          formData[key] = res.data.detail[key]
        })

        if (id) {
          formData.password = '000000' // 随便给个密码
        } else {
          formData.enabled = true
          formData.companyId = ''
          formData.roleId = ''
        }

        this.setState({
          arrListDown,
          formData
        })
        console.log('💗 formData: ', formData)
      }
    })
  };

  // 显示弹窗
  showModal = (id) => {
    let {errorData} = this.state
    errorData = {
      errorId: '',
      isError: false,
      downLoadUrl: ''
    }
    this.setState({
      isShowCreatAccountModal: true,
      id: id,
      fileList: [],
      errorData
    });
  };

  // 关闭弹窗
  handleCancel = () => {
    this.setState({
      isShowCreatAccountModal: false,
    });
  };

  // 下拉框改变
  async handleSelectChange (value:any, key:any) {
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

  // 确定
  handleOk = () => {
    let {formData} = this.state
    var paramObj = formData
    paramObj.password = formData.password !== '000000' ? formData.password : ''
    console.log('paramObj: ', paramObj)
    UserApi.save(paramObj).then(res => {
      console.log('handleOk res: ', res)
      if (res.success) {
        message.success(res.message)
        this.emitQuery()
        this.handleCancel()
      } else {
        message.error(res.message)
      }
    })
  };

  render() {
    const { arrListDown, formData } = this.state
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }

    return (
      <div>
        <Modal
          title="新建/编辑账号"
          visible={this.state.isShowCreatAccountModal}
          okText="确定"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          width="750px"
        >
          <div className="clearfix base-form">
            <Form {...formItemLayout}>
              {formItem.map(item => {
                if (item.type === 'select') {
                  return (
                    <Col span={12} key={item.model} className={!item.isShow ? 'display-none' : ''}>
                      <Form.Item label={item.label} className={item.isRequired ? 'item-required' : ''}>
                        <Select allowClear value={formData[item.model]} onChange={(e:any) => this.handleSelectChange(e, item.model)}>
                          {arrListDown[`${item.options}`].map((ops:any) => {
                            return (
                              <Option key={ops.value} value={ops.value}>{ops.label}</Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  )} else if (item.type === 'switch') {
                    return (
                      <Col span={12} key={item.model} className={!item.isShow ? 'display-none' : ''}>
                        <Form.Item label={item.label} className={item.isRequired ? 'item-required' : ''}>                          
                          <Switch checked={formData[item.model]} onChange={(e:any) => this.handleSelectChange(e, item.model)} />
                        </Form.Item>
                      </Col>
                    )
                  } else {
                    return (
                      <Col span={12} key={item.model} className={!item.isShow ? 'display-none' : ''}>
                        <Form.Item label={item.label} className={item.isRequired ? 'item-required' : ''}>
                          <Input allowClear placeholder={item.placeholder} name={item.model} value={formData[item.model]} onChange={this.handleInputChange.bind(this, item.model)}/>
                        </Form.Item>
                      </Col>
                    )
                  }
              })}
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreatAccountModal;
