import React from 'react'

// 银行到款管理
export const BankCashArrivalThead = [
  {
    title: '费用月份',
    dataIndex: 'feeDate',
    render: (text, record) => {
      const month = record.feeDate < 10 ? '0' + record.feeDate : record.feeDate
      const showTxt = month.substring(0, 4) + month.substring(4, 6)
      return (
        <span>{showTxt}</span>
      )
    }
  },
  {
    title: '客户名称',
    dataIndex: 'customerName'
  },
  {
    title: '到款日期',
    dataIndex: 'receiveDate',
    key: 'receiveDate',
    render: (text, record) => (
      <span>{record.receiveDate ? record.receiveDate.substr(0, 10) : ''}</span>
    )
  },
  {
    title: '到款银行',
    dataIndex: 'bankName'
  },
  {
    title: '到款金额',
    dataIndex: 'trueArriveTotal'
  }
]

