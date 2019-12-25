import React from 'react'
import { Modal, Button, Input, message } from 'antd'
import PolicySupportApi from '@/api/PolicySupport.api'

class CreateFileModal extends React.Component<any> {
  componentDidMount(){
    this.props.onRef(this)
    console.log(this) // ->将child传递给this.props.onRef()方法
  }
  state = {
    isShowCreateFileModal: false,
    dirname: '',
    id: ''
  };

  emitQuery = () => { // 调用父组件方法
    this.props.query();
    console.log('🧞‍ this.props: ', this.props)
  };

  showModal = (id) => {
    this.setState({
      isShowCreateFileModal: true,
      dirname: ''
    });
  };

  handleOk = () => {
    if (this.state.dirname.length) {
      var params = {
        PSID: this.props.PSID,
        dirname: this.state.dirname
      }
      PolicySupportApi.createDir(params).then(res => {
        console.log('🍇 res: ', res)
        if (res.code === 200 && res.success) {
          message.success(res.message)
          this.emitQuery()
          this.setState({
            isShowCreateFileModal: false
          })
        }
      })
    } else {
      message.error('请输入新文件夹的名称')
    }
  };

  handleCancel = () => {
    this.setState({
      isShowCreateFileModal: false,
    });
  };

  // 输入框数据双向绑定
  handleInputChange = (e) => {
    this.setState({
      dirname: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Modal
          title="新建文件夹"
          visible={this.state.isShowCreateFileModal}
          okText="确定"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
        >
          <Input placeholder="请输入新文件名" name="dirname" value={this.state.dirname} onChange={this.handleInputChange.bind(this)}></Input>
        </Modal>
      </div>
    );
  }
}

export default CreateFileModal;
