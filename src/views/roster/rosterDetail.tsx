import React, {Component} from 'react'
import { Form, Row, Col, Select, Input, Table, Button } from 'antd'
import EmployeesApi from '@/api/Employees.api'
import BreadcrumbCustom from '@/components/layout/BreadcrumbCustom'
import { Link, withRouter} from "react-router-dom"

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
  { type: 'select', label: '证件类型', placeholder: '请选择证件类型', prop: 'idType', model: 'idType', style: 'ivu-col-span-6', options: 'tempOps', fn: 'idTypeChange' },
  { type: 'input', label: '身份证号码', placeholder: '请输入身份证号码', prop: 'idCardNo', model: 'idCardNo', style: 'ivu-col-span-6', fn: 'inputOnBlur' },
  { type: 'input', label: '证件号码', placeholder: '请输入证件号码', prop: 'otherIdCardNo', model: 'otherIdCardNo', style: 'ivu-col-span-6 display-none' },
  { type: 'datePicker', label: '出生日期', placeholder: '请选择出生日期', prop: 'birthDay', model: 'birthDay', style: 'ivu-col-span-6' },
  { type: 'select', label: '性别', placeholder: '请选择性别', prop: 'sex', model: 'sex', style: 'ivu-col-span-6', options: 'tempOps' },
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
  { type: 'select', label: '婚姻情况', placeholder: '请输入婚姻情况', prop: 'maritalStatus', model: 'maritalStatus', style: 'ivu-col-span-6', options: 'tempOps' },
  { type: 'select', label: '子女情况', placeholder: '请输入子女情况', prop: 'hasChildren', model: 'hasChildren', style: 'ivu-col-span-6', options: 'tempOps' },
  { type: 'input', label: '技术职称', placeholder: '请输入技术职称', prop: 'professionalTitle', model: 'professionalTitle', style: 'ivu-col-span-6' },
  { type: 'select', label: '最高学历', placeholder: '请输入最高学历', prop: 'degree', model: 'degree', style: 'ivu-col-span-6', options: 'tempOps' },
  { type: 'input', label: '毕业学校', placeholder: '请输入毕业学校', prop: 'schoolName', model: 'schoolName', style: 'ivu-col-span-6' },
  { type: 'datePicker', label: '毕业时间', placeholder: '请输入毕业时间', prop: 'graduationDate', model: 'graduationDate', style: 'ivu-col-span-6' },
  { type: 'input', label: '专业', placeholder: '请输入专业', prop: 'discipline', model: 'discipline', style: 'ivu-col-span-6' },
  { type: 'datePicker', label: '入职时间', placeholder: '请输入入职时间', prop: 'onBoardingDate', model: 'onBoardingDate', style: 'ivu-col-span-6' },
  { type: 'input', label: '所属公司', placeholder: '请输入所属公司', prop: 'companyName', model: 'companyName', style: 'ivu-col-span-6', isDisabled: true },
  { type: 'input', label: '部门', placeholder: '请输入部门', prop: 'department', model: 'department', style: 'ivu-col-span-6' },
  { type: 'input', label: '职业', placeholder: '请输入职业', prop: 'duty', model: 'duty', style: 'ivu-col-span-6' },
  { type: 'input', label: '工号', placeholder: '请输入工号', prop: 'employeeNo', model: 'employeeNo', style: 'ivu-col-span-6' },
  { type: 'select', label: '用工形式', placeholder: '请输入用工形式', prop: 'employeeType', model: 'employeeType', style: 'ivu-col-span-6', options: 'tempOps' },
  { type: 'select', label: '在职状态', placeholder: '请输入在职状态', prop: 'beHiring', model: 'beHiring', style: 'ivu-col-span-6', options: 'tempOps' },
  { type: 'cascader', label: '所在地区', placeholder: '请输入所在地区', prop: 'city', model: 'city', style: 'ivu-col-span-6', options: 'tempOps' },
  { type: 'input', label: '工资卡名称', placeholder: '请输入工资卡名称', prop: 'accountName', model: 'accountName', parent: 'salaryCard', style: 'ivu-col-span-6', isDisabled: true },
  { type: 'input', label: '工资卡开户行', placeholder: '请输入工资卡开户行', prop: 'bankName', model: 'bankName', parent: 'salaryCard', style: 'ivu-col-span-6' },
  { type: 'input', label: '工资卡卡号', placeholder: '请输入工资卡卡号', prop: 'accountNo', model: 'accountNo', parent: 'salaryCard', style: 'ivu-col-span-6' }
]

const arrListDown:any = {
  tempOps: [{ label: 'aaa', value: '111' }, { label: 'bbb', value: '222' }]
}

class RosterDetail extends Component<any,any> {
  state:any = {
    basicInfo: {}
  }

  constructor(props:any) {
    super(props)
    console.log('RosterDetail props 🧞‍ ', props)
    this.query()
  }
  
  // 获取列表数据
  async query () {
    let basicInfo = this.state.basicInfo
    const { location }:any = this.props
    console.log('location ❌ ', location)
    var params = {
      id: location.query.id
    }
    let res = await EmployeesApi.getEmployee(params)
    console.log('res 📕 ', res)
    if (res.code === 200 && res.success) {
      basicInfo = res.data
      var result = res.data
      Object.keys(formBasicData).forEach(key => {
        formBasicData[key] = result[key] || '--'
      })
      this.setState({
        basicInfo
      })
      console.log('this.state.basicInfo 📕 ', this.state.basicInfo)
      console.log('formBasicData 📕 ', formBasicData)
    }
  }

  // 下拉框改变
  async handleSelectChange (value:any, key:any) {
    // let formBasicData = this.state.formBasicData
    formBasicData[key] = value
    // await this.setState({
    //   formBasicData
    // })
  }

  // 输入框数据双向绑定
  async handleInputChange (key:any, e:any) {
    // let formBasicData = this.state.formBasicData
    formBasicData[key] = e.target.value
    // await this.setState({
    //   formBasicData
    // })
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }

    return (
      <div className="cont-wrap">
        <div className="base-form bg-white pall-10 br-5">
          <Form {...formItemLayout}>
            {formBasicInfoItem.map(item => {
              if (item.type === 'select') {
                return (
                  <Col span={6} key={item.model}>
                    <Form.Item label={item.label}>
                      <Select allowClear defaultValue="">
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
                    <Col span={6} key={item.model}>
                      <Form.Item label={item.label}>
                        <Input allowClear placeholder={item.placeholder} name={item.model} value={formBasicData[item.model]} />
                      </Form.Item>
                    </Col>
                  )
                }
            })}
          </Form>
        </div>
      </div>
    )
  }
}

// export default RosterDetail
export default withRouter(RosterDetail)

