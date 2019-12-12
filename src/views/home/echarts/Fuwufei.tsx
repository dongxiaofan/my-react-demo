import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class Fuwufei extends Component<any, any> {
  constructor(props:any){
    super(props)
    console.log('🥁 this.props: ', this.props)
  }

  render() {
    const xAxisData = this.props.viewData.fuwufeiData.map((item: any) => {
      return item.periodMonth + '月'
    })
    let seriesData = this.props.viewData.fuwufeiData.map((item: any) => {
      return item.total
    })
    const option = {
      title: {
        text: this.props.fuwufeiTitle,
        x: 'left',
        textStyle: {
          color: '#7391c4',
          fontSize: '16',
          fontWeight: 'normal'
        }
      },
      grid: { top: 50, bottom: 20, left: 60, right: 20 },
      tooltip: {
        trigger: 'item',
        formatter: '{b} :  {c}元',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        // boundaryGap : false,
        data: xAxisData,
        position: 'bottom',
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        }
      },
      yAxis: {
        // boundaryGap: ['20%', '20%'],
        splitNumber: 4,
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        }
      },
      series: [
        {
          type: 'scatter',
          data: seriesData,
          symbolSize: function () {
            return Math.floor(Math.random() * 30)
          },
          // barWidth: 10,
          lineStyle: {
            normal: {
              color: '#72d1ff'
            }
          },
          itemStyle: {
            normal: {
              color: '#ddb1f0'
            }
          }
        }
      ]
    }

    return (
      <ReactEcharts
        option={option}
        style={{ height: '260px', width: '100%' }}
        className={'react_for_echarts'}
      />
    );
  }
}

export default Fuwufei;
