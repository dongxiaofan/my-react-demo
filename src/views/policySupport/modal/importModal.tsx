import React from 'react'
import { Modal, Button, Input, message, Upload } from 'antd'
import axios from 'axios'
import PolicySupportApi from '@/api/PolicySupport.api'

class ImportModal extends React.Component<any, any> {
  componentDidMount(){
    this.props.onRef(this)
    console.log(this) // ->将child传递给this.props.onRef()方法
  }
  
  state = {
    isShowImportModal: false,
    fileList: [],
    uploading: false
  };

  emitQuery = () => { // 调用父组件方法
    this.props.query();
    console.log('🧞‍ this.props: ', this.props)
  };

  showModal = (id) => {
    this.setState({
      isShowImportModal: true,
      id: id
    });
  };

  handleCancel = () => {
    this.setState({
      isShowImportModal: false,
    });
  };

  handleOk = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });

    this.setState({
      uploading: true,
    });

    axios.request({
      url: '/api/PolicySupport/FileUpload?PSID=' + this.props.PSID,
      method: 'post',
      data: formData
    }).then((res) => {
      this.setState({
        fileList: [],
        uploading: false,
      });
      message.success(res.data.message);
      this.handleCancel()
      this.emitQuery()
    }).catch((err) => {
      this.setState({
        uploading: false,
      });
      message.error(err.data.message);
    })
  };

  render() {
    const { uploading, fileList } = this.state
    const uploadProps = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Modal
          title="文件上传"
          visible={this.state.isShowImportModal}
          okText="确定"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
        >
          <Upload {...uploadProps}>
            <Button type="primary" className="mb-10">导入</Button>
          </Upload>
          <p className="font-12 text-gray-9 pt-10">仅支持上传10M以内的文件</p>
        </Modal>
      </div>
    );
  }
}

export default ImportModal;
