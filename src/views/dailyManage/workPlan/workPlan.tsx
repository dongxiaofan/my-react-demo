import React, {Component} from 'react'
import { Form, Row, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
// import { Link, withRouter} from "react-router-dom"
import tool from '@/lib/tool'
import moment from 'moment'
import WorkDayPlanApi from '@/api/WorkDayPlan.api'
import '@/assets/styles/dailyManage.scss'
// import ReactQuill from 'react-quill'; // ES6
// import * as ReactQuill from 'react-quill'; // Typescript
const ReactQuill = require('react-quill'); // CommonJS
import 'react-quill/dist/quill.snow.css'; // ES6

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const formItem = [
  { type: 'datePicker', label: '日期', placeholder: '请选择日期', model: 'date' },
  { type: 'select', label: '员工', placeholder: '请选择员工', model: 'userId', options: 'userList' }
];

const toolbarOptions = [
  [{ 'align': [] }],
  [{ 'color': [] }, { 'background': [] }]
]

class WorkPlan extends Component<any,any> {
  constructor(props:any) {
    super(props)

    let tempLoginInfo:any = localStorage.getItem('loginReturn')
    this.state.userId = JSON.parse(tempLoginInfo).data.userId
    console.log('🎉🎉🎉 this.state.userId: ', this.state.userId)

    this.getUserList()    
    this.getCurrWeekDays(new Date())
  };

  state: any = {
    userId: null,
    monthBaseData: {
      month_BillingTarget: null,
      week_BillingTarget: null,
      businessTargetA: null,
      businessTargetB: null,
      businessTargetC: null
    },
    formData: { date: new Date(), userId: '' },
    arrListDown: {
      userList: []
    },
    tabsArr: [
      { name: 'Sun', label: ' 星期日', date: '', content: '' },
      { name: 'Mon', label: ' 星期一', date: '', content: '' },
      { name: 'Tue', label: ' 星期二', date: '', content: '' },
      { name: 'Wed', label: ' 星期三', date: '', content: '' },
      { name: 'Thu', label: ' 星期四', date: '', content: '' },
      { name: 'Fri', label: ' 星期五', date: '', content: '' },
      { name: 'Sat', label: ' 星期六', date: '', content: '' }
    ],
    planData: {
      keyNote_Plan: '',
      morning_Plan: '',
      afternoon_Plan: '',
      remark_Plan: ''
    },
    planItem: [
      { type: 'box', key: '1', keyName: 'keyNote_Plan', title: '今日重点', style: '', content: '--', parsingContent: '' },
      { type: 'box', key: '6', keyName: 'morning_Plan', title: '上午工作', style: '', content: '--', parsingContent: '' },
      { type: 'box', key: '11', keyName: 'afternoon_Plan', title: '下午工作', style: '', content: '--', parsingContent: '' },
      { type: 'box', key: '16', keyName: 'remark_Plan', title: '备注', style: '', content: '--', parsingContent: '' }
    ],
    finishData: {
      keyNote_Complete: '',
      morning_Complete: '',
      afternoon_Complete: '',
      remark_Complete: ''
    },
    finishItem: [
      { type: 'box', key: '2', keyName: 'keyNote_Complete', title: '今日重点', style: '', content: '--', parsingContent: '' },
      { type: 'box', key: '7', keyName: 'morning_Complete', title: '上午工作', style: '', content: '--', parsingContent: '' },
      { type: 'box', key: '12', keyName: 'afternoon_Complete', title: '下午工作', style: '', content: '--', parsingContent: '' },
      { type: 'box', key: '17', keyName: 'remark_Complete', title: '备注', style: '', content: '--', parsingContent: '' }
    ],
    currentSection: '', // 点击的行-工作计划/工作完成
    currentKey: '', // 点击的块-今日重点/上午工作/下午工作/备注
    writeContent: '',
    today: moment(new Date()).format('YYYY-MM-DD'),
    selectDate: null, // 选择的日期
    selectDateNum: 0,
    editorOption: {
      modules: {
        toolbar: {
          container: toolbarOptions
        }
      }
    },
    diffDate: 0
  };

  addPlanModal: any;
  onRef = (ref, modal) => { // -> 获取整个Child元素
    this[modal] = ref
  };

  // 查询
  searchFn = () => {
    let {formData} = this.state
    this.getCurrWeekDays(formData.date)
  };

  async getUserList () {
    let {arrListDown} = this.state
    let res = await WorkDayPlanApi.getUserList()
    var arr:any = []
    if (res.success) {
      res.data.map((item:any) => {
        arr.push({label: item.name, value: item.id})
      })
      arrListDown.userList = arr
      this.setState({
        arrListDown
      })
    }
  };

  // 根据用户ID+日期获取本天工作计划
  async query (date) {
    let {formData, userId, monthBaseData, planData, finishData} = this.state
    var params = {
      userId: formData.userId ? formData.userId : userId,
      date: date
    }
    let res = await WorkDayPlanApi.getPlan(params)
    console.log('本天工作计划res: ', res)
    if (res.success) {
      var data = res.data

      // 循环日历表顶部的月数据
      Object.keys(monthBaseData).forEach(key => {
        if (data[key]) {
          monthBaseData[key] = data[key]
        } else {
          monthBaseData[key] = '0'
        }
      })

      // 循环上午工作数据
      Object.keys(planData).forEach(key => {
        if (data[key]) {
          planData[key] = data[key]
        } else {
          planData[key] = '无'
        }
      })

      // 循环下午工作数据
      Object.keys(finishData).forEach(key => {
        if (data[key]) {
          finishData[key] = data[key]
        } else {
          finishData[key] = '无'
        }
      })
    } else {
      Object.keys(monthBaseData).forEach(key => {
        monthBaseData[key] = '0'
      })

      Object.keys(planData).forEach(key => {
        planData[key] = '无'
      })

      Object.keys(finishData).forEach(key => {
        finishData[key] = '无'
      })
    }
    this.setState({formData, userId, monthBaseData, planData, finishData})
  };

  // 下拉框改变
  async handleSelectChange (value:any, key:any) {
    let {formData, userId} = this.state
    
    formData[key] = value
    userId = value ? value : userId
    this.setState({
      formData,
      userId
    })
  };

  // 输入框数据双向绑定
  async handleInputChange (key, e) {
    console.log('💀 key: ', key, ', 💀 e: ', e)
    let {formData} = this.state
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

  // 点击切换tab
  handleClickTabs (index, date) {
    let {today} = this.state
    today = date
    this.setState({
      today
    })
    this.getCurrWeekDays(date)
  };

  // 点击编辑图标
  handleEdit (section, key, keyName) {
    let {currentSection, currentKey, writeContent, planData, finishData} = this.state
    currentSection = section
    currentKey = key
    // writeContent = ''
    if (section === 'planItem') {
      writeContent = planData[keyName]
    } else if (section === 'finishItem') {
      writeContent = finishData[keyName]
    }
    
    this.setState({currentSection, currentKey, writeContent, planData, finishData})
  };

  // 点击保存编辑的内容
  async updatePlan (section, key, keyName) {
    let {formData, today, userId, writeContent, planData, finishData} = this.state
    console.log('section: ', section, ', key: ', key, ', keyName: ', keyName)
    var params = {
      userId: formData.userId ? formData.userId : userId,
      date: today,
      type: key,
      content: writeContent
    }
    let res = await WorkDayPlanApi.updatePlan(params)
    console.log('保存修改的工作计划res: ', res)
    if (res.success) {
      if (section === 'planItem') {
        planData[keyName] = writeContent
        console.log('🚩 planData: ', planData)
      } else if (section === 'finishItem') {
        finishData[keyName] = writeContent
        console.log('🚩 finishData: ', finishData)
      }
    } else {
      message.error({
        content: res.message,
        // duration: 0,
        closable: true
      })
    }

    this.setState({formData, today, userId, writeContent, planData, finishData})
    this.handleCancel()
  };

  // 取消编辑
  handleCancel () {
    this.setState({
      writeContent: '',
      currentSection: '',
      currentKey: ''
    })
  };

  // 获取当前周的开始至结束日期
  getCurrWeekDays (selectDate) {
    let {tabsArr, diffDate, selectDateNum, today} = this.state
    let tempDate:any = selectDate || new Date()
    let date:any = []
    let week:any = moment(tempDate)
    let vWeekOfDay:any = moment().format('E') // 算出这周的周几
    let cWeekOfDay:any = moment(tempDate).format('E') // 点击的日期是这周的周几
    let mon:any = week.startOf('week').format('YYYY-MM-DD') // 周初
    let sun:any = week.endOf('week').format('YYYY-MM-DD') // 周末
    let tempArr:any = []
    for (var i = 0; i < 7; i++) {
      tabsArr[i].date = moment(mon, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD')
    }
    console.log('🔅 mon: ', mon)
    console.log('🔅 tabsArr: ', tabsArr)

    // 计算选择的日期/当前日期 距离今天的天数
    let tempDiffDate:any = moment(tempDate).diff(moment(new Date()).startOf('day'), 'days')
    diffDate = tempDiffDate
    console.log('🧞‍ diffDate: ', diffDate)
    console.log('🌈 当前点击的日期是一周中的第(cWeekOfDay)', cWeekOfDay, '天 跟现在相差(tempDiffDate): ', Math.abs(tempDiffDate), '天')
    
    var tempNum:any = Math.abs(tempDiffDate) / 7
    if (tempDiffDate < 0) { // 选择的是当天以前的日期
      if (Math.abs(tempDiffDate) < vWeekOfDay) {
        selectDateNum = 0
      } else if (Math.abs(cWeekOfDay) == 1) {
        selectDateNum = parseInt(tempNum) * -1
      } else {
        selectDateNum = Math.ceil(tempNum) * -1
      }
    } else { // 选择的是当天以后的日期
      if (Math.abs(tempDiffDate) < (6 - vWeekOfDay)) {
        selectDateNum = 0
      } else if (Math.abs(cWeekOfDay) == 7) {
        selectDateNum = parseInt(tempNum)
      } else {
        selectDateNum = Math.ceil(tempNum)
      }
    }
    console.log('selectDateNum: ', selectDateNum)

    // 修改当前日期显示的内容
    today = selectDate ? moment(selectDate).format('YYYY-MM-DD') : (Math.abs(selectDateNum) !== 0 ? mon : moment(new Date()).format('YYYY-MM-DD'))
    console.log('selectDate: ', selectDate)
    console.log('today: ', today)
    this.setState({ tabsArr, diffDate, selectDateNum, today })

    this.query(today)
  };

  // 获取上周的开始至结束日期
  getPrewWeekDays () {
    this.state.selectDateNum--
    this.changeWeekDays(new Date())
  };

  // 获取下周的开始至结束日期
  getNextWeekDays () {
    this.state.selectDateNum++
    this.changeWeekDays(new Date())
  };

  // 点击前后星期时公用
  changeWeekDays (selectDate) {
    let {selectDateNum, tabsArr, today} = this.state
    // console.log('⭐ this.selectDateNum ⭐: ', this.selectDateNum)
    let tempDate = selectDate || new Date()
    const mon = moment(tempDate).day(7 * selectDateNum + 1).format('YYYY-MM-DD')
    const sun = moment(tempDate).day(7 * selectDateNum + 7).format('YYYY-MM-DD')

    for (var i = 0; i < 7; i++) {
      tabsArr[i].date = moment(mon, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD')
    }

    // 修改当前日期显示的内容
    today = selectDateNum !== 0 ? mon : moment(new Date()).format('YYYY-MM-DD')

    // 搜索栏里的日期显示改变后的日期
    // this.formData.aaa = moment(tempDate).day(7 * selectDateNum + 1)
    console.log('🐥 today: ', today)

    this.setState({selectDateNum, tabsArr, today})
    this.getCurrWeekDays(today)
  };

  // 显示弹窗-新建本周工作计划
  handleShowAddPlanModal = (id) => {
    this.addPlanModal.showModal(id)
  };

  handleQuillChange = (val) => {
    this.setState({ writeContent: val })
  };

  render () {
    let {formData, arrListDown, tabsArr, today, planItem, finishItem, currentSection, currentKey, planData, finishData, writeContent} = this.state
    return (
      <div className="cont-wrap">
        {/* 筛选部分 */}
        <div className="search-form search-form-100 clearfix mb-20">
          <Form {...formItemLayout}>
            {formItem.map(item => {
              if (item.type === 'select') {
                return (
                  <Col span={6} key={item.model}>
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
                )} else if (item.type === 'datePicker') {
                  return (
                    <Col span={6} key={item.model}>
                      <Form.Item label={item.label}>
                        <DatePicker format="YYYY-MM-DD" placeholder={item.placeholder} value={moment(formData[item.model])} onChange={(date, dateString) => this.handleDatePickerChange(date, dateString, item.model)} />
                      </Form.Item>
                    </Col>
                  )
                } else {
                  return (
                    <Col span={6} key={item.model}>
                      <Form.Item label={item.label}>
                        <Input allowClear placeholder={item.placeholder} name={item.model} value={formData[item.model]} onChange={this.handleInputChange.bind(this, item.model)}/>
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
      
        <div className="date-bg">
          <div className="date-tab">
            <div className="date-tab-arrow arrow-prev" onClick={() => this.getPrewWeekDays()}><Icon type="left" /></div>
            <div className="date-tab-arrow arrow-next" onClick={() => this.getNextWeekDays()}><Icon type="right" /></div>
            <div className="tabs-title">
              {tabsArr.map((item, index) => {
                return (
                  <div
                    className={moment(today).format('MM-DD') == moment(item.date).format('MM-DD') ? 'active tabs-title-item' : 'tabs-title-item'}
                    key={index}
                    onClick={() => this.handleClickTabs(index, item.date)}
                  >                    
                    {moment(item.date).format('MM月DD日')} {item.label}
                  </div>
                )              
              })}
            </div>
          
            <div className="date-wrap pall-20">
              {/* 标题栏 */}
              <Row className="date-subTitle">
                <Col span={4}>-</Col>
                <Col span={5}>今日重点</Col>
                <Col span={5}>上午工作</Col>
                <Col span={5}>下午工作</Col>
                <Col span={5}>备注</Col>
              </Row>

              {/* 工作计划 */}
              <Row className="date-content">
                <Col span={4} className="left-title">工作计划</Col>
                {
                  planItem.map((box, index) => {
                    return (
                      <Col span={5} key={index}>
                        <div className={currentSection === 'planItem' && currentKey === box.key ? 'active date-box-wrap' : 'date-box-wrap'}>
                          <div className="clearfix text-info edit" onClick={() => this.handleEdit('planItem', box.key, box.keyName)}>
                            <Icon type="edit" className="font-18 pull-left mr-5" />
                            <span className="pull-left">编辑</span>
                          </div>
                          {/* <div className="date-edit-wrap"></div> */}

                          {
                            currentSection === 'planItem' && currentKey === box.key ?
                            // 填写内容
                            <div className="date-edit-wrap">
                              <div className="add-plan-editor editor-180">
                                <ReactQuill value={writeContent} onChange={(e) => this.handleQuillChange(e)} />
                              </div>
                              <div className="text-center date-edit-btns">
                                <Button type="primary" className="mr-10" onClick={() => this.updatePlan('planItem', box.key, box.keyName)}>保存</Button>
                                <Button type="primary" onClick={() => this.handleCancel()}>取消</Button>
                              </div>
                            </div>
                            :
                            // 显示文字
                            <div className="date-text">{planData[box.keyName]}</div>
                          }
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>

              {/* 工作完成 */}
              <Row className="date-content">
                <Col span={4} className="left-title">工作完成</Col>
                {
                  finishItem.map((box, index) => {
                    return (
                      <Col span={5} key={index}>
                        <div className={currentSection === 'finishItem' && currentKey === box.key ? 'active date-box-wrap' : 'date-box-wrap'}>
                          <div className="clearfix text-info edit" onClick={() => this.handleEdit('finishItem', box.key, box.keyName)}>
                            <Icon type="edit" className="font-18 pull-left mr-5" />
                            <span className="pull-left">编辑</span>
                          </div>
                          {/* <div className="date-edit-wrap"></div> */}

                          {
                            currentSection === 'finishItem' && currentKey === box.key ?
                            // 填写内容
                            <div className="date-edit-wrap">
                              <div className="add-plan-editor editor-180">
                                <ReactQuill value={writeContent} onChange={(e) => this.handleQuillChange(e)} />
                              </div>
                              <div className="text-center date-edit-btns">
                                <Button type="primary" className="mr-10" onClick={() => this.updatePlan('finishItem', box.key, box.keyName)}>保存</Button>
                                <Button type="primary" onClick={() => this.handleCancel()}>取消</Button>
                              </div>
                            </div>
                            :
                            // 显示文字
                            <div className="date-text">{finishData[box.keyName]}</div>
                          }
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkPlan

