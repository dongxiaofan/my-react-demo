import React, {Component} from 'react'
import { Form, Row, Col, Select, Cascader, DatePicker, Input, Table, Button, message } from 'antd'
import SysAreaApi from '@/api/SysArea.api'
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
  { type: 'input', label: '姓名', placeholder: '请输入姓名', model: 'name', fn: 'inputOnBlur' },
  { type: 'input', label: '英文名', placeholder: '请输入英文名', model: 'eName' },
  { type: 'select', label: '证件类型', placeholder: '请选择证件类型', model: 'idType', options: 'idcardtype', fn: 'idTypeChange' },
  { type: 'input', label: '证件号码', placeholder: '请输入证件号码', model: 'idCardNo', fn: 'inputOnBlur' },
  { type: 'datePicker', label: '出生日期', placeholder: '请选择出生日期', model: 'birthDay' },
  { type: 'select', label: '性别', placeholder: '请选择性别', model: 'sex', options: 'sex' },
  { type: 'input', label: '年龄', placeholder: '请输入年龄', model: 'age' },
  { type: 'input', label: '民族', placeholder: '请输入民族', model: 'race' },
  { type: 'input', label: '籍贯', placeholder: '请输入籍贯', model: 'birthplace' },
  { type: 'datePicker', label: '证件开始时间', placeholder: '请选择证件开始时间', model: 'idCardStartTime' },
  { type: 'datePicker', label: '证件到期时间', placeholder: '请选择证件到期时间', model: 'idCardEndTime' },
  { type: 'input', label: '身份证地址', placeholder: '请输入身份证地址', model: 'idCardAddress' },
  { type: 'input', label: '现居住地址', placeholder: '请输入现居住地址', model: 'residentAddress' },
  { type: 'input', label: '手机号码', placeholder: '请输入手机号码', model: 'phone' },
  { type: 'input', label: 'Email', placeholder: '请输入Email', model: 'email' },
  { type: 'input', label: '紧急联系人', placeholder: '请输入紧急联系人', model: 'emergencyContact' },
  { type: 'input', label: '紧急联系人电话', placeholder: '请输入紧急联系人电话', model: 'emergencyContactPhone' },
  { type: 'select', label: '婚姻情况', placeholder: '请输入婚姻情况', model: 'maritalStatus', options: 'maritalstatus' },
  { type: 'select', label: '子女情况', placeholder: '请输入子女情况', model: 'hasChildren', options: 'hasChildrenOps' },
  { type: 'input', label: '技术职称', placeholder: '请输入技术职称', model: 'professionalTitle' },
  { type: 'select', label: '最高学历', placeholder: '请输入最高学历', model: 'degree', options: 'degree' },
  { type: 'input', label: '毕业学校', placeholder: '请输入毕业学校', model: 'schoolName' },
  { type: 'datePicker', label: '毕业时间', placeholder: '请输入毕业时间', model: 'graduationDate' },
  { type: 'input', label: '专业', placeholder: '请输入专业', model: 'discipline' },
  { type: 'datePicker', label: '入职时间', placeholder: '请输入入职时间', model: 'onBoardingDate' },
  { type: 'input', label: '所属公司', placeholder: '请输入所属公司', model: 'companyName', isDisabled: true },
  { type: 'input', label: '部门', placeholder: '请输入部门', model: 'department' },
  { type: 'input', label: '职业', placeholder: '请输入职业', model: 'duty' },
  { type: 'input', label: '工号', placeholder: '请输入工号', model: 'employeeNo' },
  { type: 'select', label: '用工形式', placeholder: '请输入用工形式', model: 'employeeType', options: 'EmploymentForm' },
  { type: 'select', label: '在职状态', placeholder: '请输入在职状态', model: 'beHiring', options: 'beHiringOps' },
  { type: 'cascader', label: '所在地区', placeholder: '请选择所在地区', model: 'city', options: 'cityId' },
  { type: 'input', label: '工资卡名称', placeholder: '请输入工资卡名称', model: 'accountName', parent: 'salaryCard', isDisabled: true },
  { type: 'input', label: '工资卡开户行', placeholder: '请输入工资卡开户行', model: 'bankName', parent: 'salaryCard' },
  { type: 'input', label: '工资卡卡号', placeholder: '请输入工资卡卡号', model: 'accountNo', parent: 'salaryCard' }
]

const arrListDown:any = {
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

let urlParams = {}

class RosterDetail extends Component<any,any> {
  state:any = {
    basicInfo: {},
    formBasicData: {},
    canEdit: false,
    areaTree: []
  }

  constructor(props:any) {
    super(props)

    // 获取URL参数
    urlParams = tool.queryUrlParams(props.location.search)

    // 获取省市区级联选择内容
    let tempAreaTree:any = localStorage.getItem('areaTree')
    this.state.areaTree = JSON.parse(tempAreaTree)

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
                        <Cascader options={this.state.areaTree} placeholder={this.state.canEdit ? item.placeholder : '未选择'} value={this.state.formBasicData[item.model]} onChange={(value, selectedOptions) => this.handleCascaderChange(value, selectedOptions, item.model)} disabled={!this.state.canEdit}>
                        </Cascader>
                      </Form.Item>
                    </Col>
                  )
                } else if (item.type === 'datePicker') {
                  return (
                    <Col span={6} key={item.model}>
                      <Form.Item label={item.label}>
                        <DatePicker format="YYYY-MM-DD" placeholder={this.state.canEdit ? item.placeholder : '未选择'} value={moment(this.state.formBasicData[item.model])} onChange={(date, dateString) => this.handleDatePickerChange(date, dateString, item.model)} disabled={!this.state.canEdit} />
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
            <span>
              <Button type="primary" onClick={e => this.handleSubmit()}>提交</Button>
              <Button type="default" onClick={e => this.goBack()} className="ml-20">返回</Button>
            </span>
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

