import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
// import { Coordinates, CityCP } from './city.js'

class China extends Component<any, any> {
  constructor(props:any){
    super(props)
  }

  render() {
    const option = {
      tooltip: {
        trigger: 'item',
        padding: [10, 20, 10, 20],
        formatter: function (params) {
          if (params.data) {
            return `
              <div class="line-h-28">
                <p class="font-16 pb-5">${params.data.fullName}</p>
                <p>客户数量：<span class="text-warning2 font-16 font-weight pr-5">${params.data.companyCount}</span>家</p>
                <p>人事代理：<span class="text-warning2 font-16 font-weight pr-5">${params.data.agentCount}</span>家</p>
                <p>劳务派遣：<span class="text-warning2 font-16 font-weight pr-5">${params.data.laborDispatchCount}</span>家</p>
                <p>劳务外包：<span class="text-warning2 font-16 font-weight pr-5">${params.data.outsourcingCount}</span>家</p>
                <p>员工数量：<span class="text-warning2 font-16 font-weight pr-5">${params.data.empCount}</span>人</p>
                <p>在职：<span class="text-warning2 font-16 font-weight pr-5">${params.data.beHiringCount}</span>人</p>
                <p>离职：<span class="text-warning2 font-16 font-weight pr-5">${params.data.noBeHiringCount}</span>人</p>
              </div>
            `
          } else {
            return `
              <div class="line-h-28">${params.name} 暂无数据</div>
            `
          }
        }
      },
      // color: color,
      visualMap: {
        // type: 'piecewise',
        // min: 0,
        // max: 100,
        show: true,
        range: null,
        splitNumber: 5,
        inRange: {
          color: ['#bfe7ff', '#1badf4', '#0996da']
        },
        textStyle: {
          color: '#999'
        },
        // outOfRange: {
        //   color: ['#bfe7ff', '#1badf4', '#0996da']
        // },
        seriesIndex: 0
      },
      geo: {
        map: 'china',
        show: true,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: '#023677',
            borderColor: '#1180c7',
          },
          emphasis: {
            areaColor: '#4499d0',
          }
        }
      },
      series: [
        {
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true,
              color: '#54acd7', // 省份默认的文字颜色
            },
            emphasis: {
              color: '#000' // 鼠标经过时的文字颜色
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#9dd9fd',
              borderColor: '#d3f3ff'
            },
            emphasis: {
              show: false,
              color: '#fff',
              areaColor: '#ffcc3b' // 鼠标经过时的黄色背景
              // areaColor: '#54c7ff' // 鼠标经过时的蓝色背景
            }
          },
          data: this.props.setChinaData
        },
        {
          type: 'effectScatter', // 带涟漪的散点图
          coordinateSystem: 'geo',
          legendHoverLink: false,            
          visualMap: false,
          symbol: 'circle',
          symbolSize: 18,
          showEffectOn: 'render',
          hoverAnimation: false,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            color: 'yellow'
          },
          zlevel: 2,
          tooltip: {
            show: false
          },
          label: {
            show: true,
            color: '#000',
            formatter: function (params) {
              return params.name
            },
            position: 'bottom'
          },
          silent: true,
          data: this.props.geoCoordMap // 坐标散点（单个）
        },
      ]
    }

    return (
      <ReactEcharts
        option={option}
        style={{ height: '820px', width: '100%' }}
        className={'react_for_echarts'}
      />
    );
  }
}

export default China;
