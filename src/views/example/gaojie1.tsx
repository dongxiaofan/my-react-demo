import React, {Component} from 'react'
import { Form, Row, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
import HOC from './HOC'

class Gaojie1 extends Component<any,any> {
  constructor(props) {
    super(props)
  }

  state = {
    title: '高阶组件 范例1'
  };

  render() {
    let {title} = this.state
    return (
      <div className="clearfix">
        <h3 className="text-primary">{title}</h3>
      </div>
    );
  }
}
export default HOC(Gaojie1)