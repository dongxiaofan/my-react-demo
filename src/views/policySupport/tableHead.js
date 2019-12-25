import React from 'react'
import { Icon } from 'antd'

export const PolicySupportThead = [
  // {
  //   title: '文件名称',
  //   dataIndex: 'fileName',
  //   render: (text, record, index) => {
  //     return record.type === 2 ? (
  //       <a onClick={() => this.handleFolder(index, record)}>
  //         <Icon type="folder-open" theme="filled" className="pr-10 font-24 text-warning" />
  //         <span>{text}</span>
  //       </a>
  //     ) : (
  //       <span>{text}</span>
  //     );
  //   },
  // },
  {
    title: '文件大小',
    dataIndex: 'fileSize'
  },
  {
    title: '上传时间',
    dataIndex: 'createrTime',
    key: 'createrTime',
    render: (text, record) => (
      <span>{record.createrTime ? record.createrTime.substr(0, 10) : ''}</span>
    )
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    render: (text, record) => (
      <span>{record.fileType === 1 ? '公共文件' : '个人文件'}</span>
    )
  },
  {
    title: '创建人',
    dataIndex: 'createrName'
  }
]

