import React, { Component } from 'react';
import { Form, Row, Col, Icon, Card, Select, Input, Table, Button } from 'antd'
import WorkBenchApi from '@/api/WorkBench.api'
import ReportApi from '@/api/Report.api'
import '@/assets/styles/home.scss'

import echarts from 'echarts'
import Shebao from './echarts/Shebao'
import Gongjijin from './echarts/Gongjijin'
import Fuwufei from './echarts/Fuwufei'
import China from './echarts/China'
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import { Coordinates, CityCP } from './echarts/city.js'
import { Features } from './echarts/features.js'
import { any } from 'prop-types';

const dataItem = [
  { title: '客户总数', model: 'customerTotal', icon: 'database', color: '#2d8cf0' },
  { title: '人事代理客户', model: 'agentTotal', icon: 'container', color: '#19be6b' },
  { title: '劳务派遣客户', model: 'laborDispatchTotal', icon: 'profile', color: '#ff9900' },
  { title: '劳务外包客户', model: 'outsourcingTotal', icon: 'project', color: '#ed3f14' },
  { title: '在职员工', model: 'inEmployee', icon: 'solution', color: '#e46cbb' },
  { title: '离职员工', model: 'outEmployee', icon: 'usergroup-delete', color: '#9a66e4' }
]

interface IJokeList {
	name: string;
	cp: any
}

class Home extends Component<any, any> {
  state:any = {
    statsTotal: {},
    insuranceDatas: {
      shebaoData: [],
      shangbaoData: [],
      gongjijinData: [],
      fuwufeiData: []
    },
    chinaData: [],
    geoCoordMap: [],
    setChinaData: [],
    cityNameArr: [],
    shebaoTitle: '全国社保费用统计',
    gongjijinTitle: '全国公积金费用统计',
    fuwufeiTitle: '全国服务费用统计',
    chinaTitle: '全国客户数据分布'
  };

  constructor(props:any) {
    super(props)
    this.getDataScreen()
    this.getBills()
    this.getInfoBy()
  }

  // 获取数据统计
  async getDataScreen () {
    let {statsTotal} = this.state
    var params = {}
    let res = await WorkBenchApi.getDataScreen(params)
    if (res.success) {
      let result = res.data
      Object.keys(this.state.statsTotal).forEach(key => {
        this.state.statsTotal[key] = result[key]
      })
      statsTotal = result
      this.setState({
        statsTotal
      })
    }
  }

  // 获取图标数据
  async getBills () {
    let {insuranceDatas} = this.state
    var params = {flag: 0}
    let res = await ReportApi.getBills(params)
    if (res.success) {
      let result = res.data

      insuranceDatas.shebaoData = []
      insuranceDatas.gongjijinData = []
      insuranceDatas.shangbaoData = []
      insuranceDatas.xinziData = []
      insuranceDatas.fuwufeiData = []

      result.map((item: any) => {
        if (item.category === 1) { // 社保
          insuranceDatas.shebaoData.push(item)
        } else if (item.category === 2) { // 公积金
          insuranceDatas.gongjijinData.push(item)
        } else if (item.category === 4) { // 商保
          insuranceDatas.shangbaoData.push(item)
        } else if (item.category === 8) { // 薪资
          insuranceDatas.xinziData.push(item)
        } else { // 服务费
          insuranceDatas.fuwufeiData.push(item)
        }
      })

      this.setState({
        insuranceDatas
      })
    }
  }

  // 获取中国地图合计信息
  async getInfoBy () {
    let {cityNameArr, chinaData, setChinaData} = this.state
  
    var params = {flag: 0}
    let res = await ReportApi.getInfoBy(params)
    if (res.success) {
      let result = res.data
      var tempCityNameArr:any = []
      var tempCityCompanyCountArr:any = [] // 有数据的省份的客户数

      result.map((item:any) => {
        item.fullName = item.areaName
        item.value = item.companyCount // 客户数量
        var name = ''
        if (['内蒙古', '黑龙江'].indexOf(item.areaName.substring(0, 3)) != -1) {
          name = item.areaName.substring(0, 3)
        } else {
          name = item.areaName.substring(0, 2)
        }
        item.name = name
        tempCityNameArr.push(item.name)
        tempCityCompanyCountArr.push(item.companyCount) // 把有数据的省份的客户数放入数组
      })

      cityNameArr = tempCityNameArr
      chinaData = result
      setChinaData = this.setChinaData(result)

      this.setState({
        chinaData,
        cityNameArr,
        setChinaData
      })

      this.queryCP()
    }
  }

  // 有数据的省份赋地理经纬度
  queryCP () {
    let {geoCoordMap, cityNameArr} = this.state
    // 有数据的省份赋地理经纬度
    var tempGeoCoordMap:any = []
    var mapFeatures = Features
    mapFeatures.forEach(v => {
      let tempObj = {
        name: v.properties.name, // 地区名称
        value: v.properties.cp // 经纬度
      }
      if (cityNameArr.indexOf(v.properties.name) !== -1) {
        tempGeoCoordMap.push(tempObj)
      }

    })
    geoCoordMap = tempGeoCoordMap
    this.setState({
      geoCoordMap
    })
  }

  setChinaData (chinaData) {
    var data = chinaData
    data.map(item => {
      item.label = {
        normal: {
          show: false // 有数据的省份隐藏省份名称（在散点层显示）
        }
      }
    })
    return data
  }

  render() {
    return (
      <div className="cont-wrap">
        <div className="home-data-wrap mb-20">
          <Row>
            {dataItem.map(item => {
              return (
                <Col span={4} key={item.model}>
                  <div className="home-data-item">
                    <div className="item-left-area" style={{background: item.color}}>
                      <Icon type={item.icon} />
                    </div>
                    <div className="item-right-area">
                      <div className="font-50">{this.state.statsTotal[item.model]}</div>
                      <div>{item.title}</div>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>

        <div className="home-echarts-wrap">
          <Row>
            <Col span={16}>
              <div className="home-echarts-china">
                <China setChinaData={this.state.setChinaData} geoCoordMap={this.state.geoCoordMap}/>
              </div>
            </Col>
            <Col span={8}>
              <div className="home-echarts-wrap mb-20">
                <Row>
                  <Col span={24} className="mb-20">
                    <div className="home-echarts-item">
                      <Gongjijin gongjijinTitle={this.state.gongjijinTitle} viewData={this.state.insuranceDatas}/>
                    </div>
                  </Col>

                  <Col span={24} className="mb-20">
                    <div className="home-echarts-item">
                      <Shebao shebaoTitle={this.state.shebaoTitle} viewData={this.state.insuranceDatas}/>
                    </div>
                  </Col>

                  <Col span={24}>
                    <div className="home-echarts-item">
                      <Fuwufei fuwufeiTitle={this.state.fuwufeiTitle} viewData={this.state.insuranceDatas}/>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
