import React, {Component} from 'react'
import { Form, Row, Col, Select, Cascader, DatePicker, Input, Table, Button, message } from 'antd'
import EmployeesApi from '@/api/Employees.api'
import BreadcrumbCustom from '@/components/layout/BreadcrumbCustom'
import { Link, withRouter} from "react-router-dom"
import tool from '@/lib/tool'
import moment from 'moment'

const { Option } = Select
// 员工基本信息form
const formBasicData = {
  id: '', // 员工ID
  companyId: '', // 公司ID
  companyName: '', // 公司名称
  insuranceId: '', // 保险ID
  name: '',
  eName: '',
  idType: '0',
  idCardNo: '',
  otherIdCardNo: '',
  birthDay: '',
  sex: '',
  age: '',
  race: '',
  birthplace: '',
  idCardStartTime: '',
  idCardEndTime: '',
  idCardAddress: '',
  residentAddress: '',
  Phone: '',
  email: '',
  emergencyContact: '',
  emergencyContactPhone: '',
  maritalStatus: '',
  hasChildren: '',
  professionalTitle: '',
  degree: '',
  schoolName: '',
  graduationDate: '',
  discipline: '',
  onBoardingDate: '',
  department: '',
  duty: '',
  employeeNo: '',
  employeeType: '',
  employeeTypeName: '',
  beHiring: 'true',
  city: [],
  cityStr: '',
  accountName: '',
  bankName: '',
  accountNo: '',
  salaryCard: {
    accountName: '',
    bankName: '',
    accountNo: ''
  }
}

// 员工基本信息item
const formBasicInfoItem = [
  { type: 'input', label: '姓名', placeholder: '请输入姓名', prop: 'name', model: 'name', style: 'ivu-col-span-6', fn: 'inputOnBlur' },
  { type: 'input', label: '英文名', placeholder: '请输入英文名', prop: 'eName', model: 'eName', style: 'ivu-col-span-6' },
  { type: 'select', label: '证件类型', placeholder: '请选择证件类型', prop: 'idType', model: 'idType', style: 'ivu-col-span-6', options: 'idcardtype', fn: 'idTypeChange' },
  { type: 'input', label: '证件号码', placeholder: '请输入证件号码', prop: 'idCardNo', model: 'idCardNo', style: 'ivu-col-span-6', fn: 'inputOnBlur' },
  { type: 'datePicker', label: '出生日期', placeholder: '请选择出生日期', prop: 'birthDay', model: 'birthDay', style: 'ivu-col-span-6' },
  { type: 'select', label: '性别', placeholder: '请选择性别', prop: 'sex', model: 'sex', style: 'ivu-col-span-6', options: 'sex' },
  { type: 'input', label: '年龄', placeholder: '请输入年龄', prop: 'age', model: 'age', style: 'ivu-col-span-6' },
  { type: 'input', label: '民族', placeholder: '请输入民族', prop: 'race', model: 'race', style: 'ivu-col-span-6' },
  { type: 'input', label: '籍贯', placeholder: '请输入籍贯', prop: 'birthplace', model: 'birthplace', style: 'ivu-col-span-6' },
  { type: 'datePicker', label: '证件开始时间', placeholder: '请选择证件开始时间', prop: 'idCardStartTime', model: 'idCardStartTime', style: 'ivu-col-span-6' },
  { type: 'datePicker', label: '证件到期时间', placeholder: '请选择证件到期时间', prop: 'idCardEndTime', model: 'idCardEndTime', style: 'ivu-col-span-6' },
  { type: 'input', label: '身份证地址', placeholder: '请输入身份证地址', prop: 'idCardAddress', model: 'idCardAddress', style: 'ivu-col-span-6' },
  { type: 'input', label: '现居住地址', placeholder: '请输入现居住地址', prop: 'residentAddress', model: 'residentAddress', style: 'ivu-col-span-6' },
  { type: 'input', label: '手机号码', placeholder: '请输入手机号码', prop: 'phone', model: 'phone', style: 'ivu-col-span-6' },
  { type: 'input', label: 'Email', placeholder: '请输入Email', prop: 'email', model: 'email', style: 'ivu-col-span-6' },
  { type: 'input', label: '紧急联系人', placeholder: '请输入紧急联系人', prop: 'emergencyContact', model: 'emergencyContact', style: 'ivu-col-span-6' },
  { type: 'input', label: '紧急联系人电话', placeholder: '请输入紧急联系人电话', prop: 'emergencyContactPhone', model: 'emergencyContactPhone', style: 'ivu-col-span-6' },
  { type: 'select', label: '婚姻情况', placeholder: '请输入婚姻情况', prop: 'maritalStatus', model: 'maritalStatus', style: 'ivu-col-span-6', options: 'maritalstatus' },
  { type: 'select', label: '子女情况', placeholder: '请输入子女情况', prop: 'hasChildren', model: 'hasChildren', style: 'ivu-col-span-6', options: 'hasChildrenOps' },
  { type: 'input', label: '技术职称', placeholder: '请输入技术职称', prop: 'professionalTitle', model: 'professionalTitle', style: 'ivu-col-span-6' },
  { type: 'select', label: '最高学历', placeholder: '请输入最高学历', prop: 'degree', model: 'degree', style: 'ivu-col-span-6', options: 'degree' },
  { type: 'input', label: '毕业学校', placeholder: '请输入毕业学校', prop: 'schoolName', model: 'schoolName', style: 'ivu-col-span-6' },
  { type: 'datePicker', label: '毕业时间', placeholder: '请输入毕业时间', prop: 'graduationDate', model: 'graduationDate', style: 'ivu-col-span-6' },
  { type: 'input', label: '专业', placeholder: '请输入专业', prop: 'discipline', model: 'discipline', style: 'ivu-col-span-6' },
  { type: 'datePicker', label: '入职时间', placeholder: '请输入入职时间', prop: 'onBoardingDate', model: 'onBoardingDate', style: 'ivu-col-span-6' },
  { type: 'input', label: '所属公司', placeholder: '请输入所属公司', prop: 'companyName', model: 'companyName', style: 'ivu-col-span-6', isDisabled: true },
  { type: 'input', label: '部门', placeholder: '请输入部门', prop: 'department', model: 'department', style: 'ivu-col-span-6' },
  { type: 'input', label: '职业', placeholder: '请输入职业', prop: 'duty', model: 'duty', style: 'ivu-col-span-6' },
  { type: 'input', label: '工号', placeholder: '请输入工号', prop: 'employeeNo', model: 'employeeNo', style: 'ivu-col-span-6' },
  { type: 'select', label: '用工形式', placeholder: '请输入用工形式', prop: 'employeeType', model: 'employeeType', style: 'ivu-col-span-6', options: 'EmploymentForm' },
  { type: 'select', label: '在职状态', placeholder: '请输入在职状态', prop: 'beHiring', model: 'beHiring', style: 'ivu-col-span-6', options: 'beHiringOps' },
  { type: 'cascader', label: '所在地区', placeholder: '请选择所在地区', prop: 'city', model: 'city', style: 'ivu-col-span-6', options: 'cityId' },
  { type: 'input', label: '工资卡名称', placeholder: '请输入工资卡名称', prop: 'accountName', model: 'accountName', parent: 'salaryCard', style: 'ivu-col-span-6', isDisabled: true },
  { type: 'input', label: '工资卡开户行', placeholder: '请输入工资卡开户行', prop: 'bankName', model: 'bankName', parent: 'salaryCard', style: 'ivu-col-span-6' },
  { type: 'input', label: '工资卡卡号', placeholder: '请输入工资卡卡号', prop: 'accountNo', model: 'accountNo', parent: 'salaryCard', style: 'ivu-col-span-6' }
]

const arrListDown:any = {
  tempOps: [{ label: 'aaa', value: '111' }, { label: 'bbb', value: '222' }],
  // isBeHiring: [{ label: '在职', value: 'true' }, { label: '离职', value: 'false' }],
  // securitytype: []
  cityId: [],
  booleanJudge: [{ value: 'true', label: '是' }, { value: 'false', label: '否' }],
  tempOptions: [{ value: 0, label: '选项1' }, { value: 1, label: '选项2' }],
  hasChildrenOps: [{ value: 'true', label: '有' }, { value: 'false', label: '无' }],
  beHiringOps: [{ value: 'true', label: '在职' }, { value: 'false', label: '离职' }],
  idcardtype: [],
  sex: [],
  maritalstatus: [],
  degree: [],
  EmploymentForm: []
}

let areaTree:any = []

let urlParams = {}

class RosterDetail extends Component<any,any> {
  state:any = {
    basicInfo: {},
    formBasicData: {},
    canEdit: false
  }

  constructor(props:any) {
    super(props)

    // 获取URL参数
    urlParams = tool.queryUrlParams(props.location.search)
    
    // 获取全国省份
    let provinceList:any = localStorage.getItem('provinceList')
    arrListDown.cityId = JSON.parse(provinceList) // 全国省份列表
    arrListDown.cityId.map(item => {
      item.value = item.id
      item.label = item.name
    })
    console.log('🧞‍ arrListDown： ', arrListDown)
    let tempAreaTree:any = localStorage.getItem('areaTree')
    areaTree = JSON.parse(tempAreaTree)

    this.state.canEdit = urlParams['isEdit'] == 'true' ? true : false

    this.getEnum()
    this.query()
  }

  // 数据字典
  getEnum () {
    let groupName = 'employee.idcardtype,employee.sex,employee.maritalstatus,employee.degree'
    tool.getEnum(groupName, arrListDown)
    let typeName = 'EmploymentForm'
    tool.getSelectValueList(typeName, arrListDown)
  }
  
  // 获取列表数据
  async query () {
    let basicInfo = this.state.basicInfo
    let formBasicData = this.state.formBasicData
    var params = {
      id: urlParams['id']
    }
    let res = await EmployeesApi.getEmployee(params)
    if (res.code === 200 && res.success) {
      basicInfo = res.data
      var result = res.data
      // Object.keys(formBasicData).forEach(key => {
      //   formBasicData[key] = result[key] || '--'
      // })

      // 根据获取到的数据字段循环结果并赋值到表单
      for (var item in result) {
        if (typeof result[item] === 'boolean') {
          formBasicData[item] = result[item] + ''
        } else if (typeof result[item] === 'object') {
          for (var c_item in result[item]) {
            formBasicData[c_item] = result[item][c_item] + ''
          }
        } else {
          if (item === 'city') {
            var tempCity = result[item].substring(1, result[item].length - 1)
            formBasicData[item] = tempCity.split(',')
          } else {
            formBasicData[item] = result[item] + ''
          }
        }
      }
      this.setState({
        basicInfo,
        formBasicData
      })
      console.log('this.state.formBasicData 💧: ', this.state.formBasicData)
    }
  }

  // 下拉框改变
  async handleSelectChange (value, model) {
    let formBasicData = this.state.formBasicData
    formBasicData[model] = value
    await this.setState({
      formBasicData
    })
  }

  // 输入框数据双向绑定
  async handleInputChange (model, e) {
    let formBasicData = this.state.formBasicData
    formBasicData[model] = e.target.value
    await this.setState({
      formBasicData
    })
  }

  // 时间选择
  async handleDatePickerChange (date, dateString, model) {
    let formBasicData = this.state.formBasicData
    formBasicData[model] = dateString
    await this.setState({
      formBasicData
    })
  }
  
  // 树选择
  async handleCascaderChange (value, selectedOptions, model) {
    let formBasicData = this.state.formBasicData
    formBasicData[model] = value
    await this.setState({
      formBasicData
    })
  }

  // 提交表单
  async handleSubmit () {
    let stateFormBasicData = this.state.formBasicData
    // 表单二级obj解析
    formBasicInfoItem.map(item => {
      if (item.parent) { // 查找表单里面是否有二级obj
        var itemModel = item.model
        formBasicData.salaryCard[itemModel] = stateFormBasicData[item.model] // 如果有二级obj，则把表单里相应的字段放在二级obj里
      }
    })
    stateFormBasicData.salaryCard = formBasicData.salaryCard
    this.setState({
      stateFormBasicData
    })
    console.log('🧞‍ this.state.formBasicData: ', this.state.formBasicData)
    const that = this
    let res = await EmployeesApi.postEmployee(this.state.formBasicData)
    if (res.code === 200 && res.success) {
      message.success(res.message)
      setTimeout(() => {
        that.props.history.push('/app/roster/rosterList')
      }, 3000)
    } else {
      message.error(res.message)
    }
  }

  goBack () {
    this.props.history.push('/app/roster/rosterList')
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }

    return (
      <div className={urlParams['isEdit'] == 'true' ? 'cont-wrap' : 'has-disabled cont-wrap'}>
        <div className="public-title">基本信息</div>
        <div className="base-form bg-white pl-20 pr-50 pt-30 pb-20 br-5">
          <Form {...formItemLayout}>
            {formBasicInfoItem.map(item => {
              if (item.type === 'select') {
                return (
                  <Col span={6} key={item.model}>
                    <Form.Item label={item.label}>
                      <Select allowClear placeholder={this.state.canEdit ? item.placeholder : '未选择'} value={this.state.formBasicData[item.model]} onChange={(e:any) => this.handleSelectChange(e, item.model)} disabled={!this.state.canEdit}>
                        {arrListDown[`${item.options}`].map((ops:any) => {
                          return (
                            <Option key={ops.value} value={ops.value}>{ops.label}</Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                )} else if (item.type === 'cascader') {
                  return (
                    <Col span={6} key={item.model}>
                      <Form.Item label={item.label}>
                        <Cascader options={areaTree} placeholder={this.state.canEdit ? item.placeholder : '未选择'} value={this.state.formBasicData[item.model]} onChange={(value, selectedOptions) => this.handleCascaderChange(value, selectedOptions, item.model)} disabled={!this.state.canEdit}>
                        </Cascader>
                      </Form.Item>
                    </Col>
                  )
                } else if (item.type === 'datePicker') {
                  return (
                    <Col span={6} key={item.model}>
                      <Form.Item label={item.label}>
                        <DatePicker format="YYYY/MM/DD" placeholder={this.state.canEdit ? item.placeholder : '未选择'} value={moment(this.state.formBasicData[item.model])} onChange={(date, dateString) => this.handleDatePickerChange(date, dateString, item.model)} disabled={!this.state.canEdit} />
                      </Form.Item>
                    </Col>
                  )
                } else {
                  return (
                    <Col span={6} key={item.model}>
                      <Form.Item label={item.label}>
                        <Input allowClear placeholder={this.state.canEdit ? item.placeholder : '未填写'} name={item.model} value={this.state.formBasicData[item.model]} onChange={this.handleInputChange.bind(this, item.model)} disabled={!this.state.canEdit} />
                      </Form.Item>
                    </Col>
                  )
                }
            })}
          </Form>
        </div>
        
        <div className="text-center pt-20">
          {
            this.state.canEdit ?
            <Button type="primary" onClick={e => this.handleSubmit()}>提交</Button>
            :
            <Button type="default" onClick={e => this.goBack()}>返回</Button>
          }
        </div>
      </div>
    )
  }
}

// export default RosterDetail
export default withRouter(RosterDetail)

