import React from 'react'
import { Icon } from 'antd'
// 账号管理
export const AccountThead = [
  {
    title: '账号名称',
    dataIndex: 'name'
  },
  {
    title: '登陆名称',
    dataIndex: 'userName'
  },
  {
    title: '手机号码',
    dataIndex: 'phone'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '所属公司',
    dataIndex: 'companyName'
  },
  {
    title: '角色',
    dataIndex: 'roleName'
  },
  {
    title: '账号状态',
    dataIndex: 'enabled',
    render: (text, record) => (
      <span className={record.enabled == true ? 'text-primary' : 'text-danger'}>{record.enabled == true ? '已启用' : '禁用'}</span>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'createdOn',
    render: (text, record) => (
      <span>{record.createdOn ? record.createdOn.substr(0, 10) : ''}</span>
    )
  }
]

