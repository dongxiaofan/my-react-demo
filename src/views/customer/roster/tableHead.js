import React from 'react'

export const rosterListThead = [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '身份证号码',
    dataIndex: 'idCardNo'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: (text, record) => (
      <span>{record.sex === 1 ? '男' : '女'}</span>
    )
  },
  {
    title: '手机号码',
    dataIndex: 'phone'
  },
  {
    title: '在职状态',
    dataIndex: 'beHiring',
    render: (text, record) => (
      <span>{record.beHiring == true ? '在职' : '离职'}</span>
    )
  },
  {
    title: '公司名称',
    dataIndex: 'companyName'
  },
  {
    title: '部门',
    dataIndex: 'department'
  },
  {
    title: '职业',
    dataIndex: 'duty'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (text, record) => (
      <span>{record.createTime ? record.createTime.substr(0, 10) : ''}</span>
    )
  }
]

