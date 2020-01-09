import React, {Component} from 'react'
import { Form, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
import PolicySupportApi from '@/api/PolicySupport.api'

class SendOrder extends Component<any,any> {
  constructor(props:any) {
    super(props)
  };

  state: any = {};

  render () {
    return (
      <div className="cont-wrap">
        <p>派单管理</p>
      </div>
    )
  }
}

export default SendOrder