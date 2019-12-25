import React from 'react'
import { Modal, Button, Input, message } from 'antd'
import PolicySupportApi from '@/api/PolicySupport.api'

class ReNameModal extends React.Component<any> {
  componentDidMount(){
    this.props.onRef(this)
    console.log(this) // ->将child传递给this.props.onRef()方法
  }
  state = {
    isShowReNameModal: false,
    newname: '',
    id: ''
  };

  emitQuery = () => { // 调用父组件方法
    this.props.query();
    console.log('🧞‍ this.props: ', this.props)
  };

  showModal = (id) => {
    this.setState({
      isShowReNameModal: true,
      newname: '',
      id: id
    });
  };

  handleOk = () => {
    if (this.state.newname.length) {
      var params = {
        id: this.state.id,
        newname: this.state.newname
      }
      PolicySupportApi.reName(params).then(res => {
        console.log('🍇 res: ', res)
        if (res.code === 200 && res.success) {
          message.success(res.message)
          this.emitQuery()
          this.setState({
            isShowReNameModal: false
          })
        }
      })
    } else {
      message.error('请输入新文件名')
    }
  };

  handleCancel = () => {
    this.setState({
      isShowReNameModal: false,
    });
  };

  // 输入框数据双向绑定
  handleInputChange = (e) => {
    this.setState({
      newname: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Modal
          title="文件重命名"
          visible={this.state.isShowReNameModal}
          okText="确定"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
        >
          <Input placeholder="请输入新文件名" name="newname" value={this.state.newname} onChange={this.handleInputChange.bind(this)}></Input>
        </Modal>
      </div>
    );
  }
}

export default ReNameModal;
