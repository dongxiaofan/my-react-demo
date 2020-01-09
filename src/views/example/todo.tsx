import React, {Component} from 'react'
import { Form, Row, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
// import HOC from './HOC'

class Register extends Component<any,any> {
  constructor(props) {
    super(props)
  }

  state = {
    inpVal: '',
    list: []
  };

  // 输入框数据双向绑定
  async handleInputChange (e) {
    this.setState({
      inpVal: e.target.value
    })
  };

  // 删除
  handleDelete = (index) => {
    let {list} = this.state
    list.splice(index, 1)
    this.setState({list})
  };

  // 确认添加
  handleTodo = (val) => {
    let {list} = this.state
    list = list.concat(val)
    this.setState({
      list,
      inpVal: ''
    })
  };

  render() {
    let {inpVal, list} = this.state
    return (
      <div className="cont-wrap">
        <div className="clearfix">
          <Row>
            <Col span={6}>
              <Input value={inpVal} onChange={this.handleInputChange.bind(this)} />
            </Col>
            <Col span={4}>
              <Button type="primary" className="ml-20" onClick={(e) => this.handleTodo(inpVal)}>确认添加</Button>
            </Col>
          </Row>

          <div className="clearfix">
              {list.map((item, index) => {
                return (
                  <p className="" key={index}>
                    <span className="pr-20">{index}: {item}</span>
                    <Icon type="close" onClick={(e) => this.handleDelete(index)} />
                  </p>
                )
              })}
            </div>
        </div>
      </div>
    );
  }
}
export default Register