import React from 'react'
import { Modal, Button, Input, message, Upload } from 'antd'
import axios from 'axios'
import PolicySupportApi from '@/api/PolicySupport.api'
import config from '@/axios/config'

class BatchImportModal extends React.Component<any, any> {
  componentDidMount(){
    this.props.onRef(this)
    console.log(this) // ->将child传递给this.props.onRef()方法
  }
  
  state = {
    isShowImportModal: false,
    fileList: [],
    uploading: false,
    errorData: {
      errorId: '',
      isError: false,
      downLoadUrl: ''
    },
    templateDownLoadUrl: config.apiUrl + '/Content/Template/批量导入账号模板.xls?random=' + Math.floor(Math.random() * 10)
  };

  emitQuery = () => { // 调用父组件方法
    this.props.query();
    console.log('🧞‍ this.props: ', this.props)
  };

  // 显示弹窗
  showModal = (id) => {
    let {errorData} = this.state
    errorData = {
      errorId: '',
      isError: false,
      downLoadUrl: ''
    }
    this.setState({
      isShowImportModal: true,
      id: id,
      fileList: [],
      errorData
    });
  };

  // 关闭弹窗
  handleCancel = () => {
    this.setState({
      isShowImportModal: false,
    });
  };

  // 确定上传
  handleOk = () => {
    const { fileList, errorData } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });

    this.setState({
      uploading: true,
    });

    axios.request({
      url: '/api/User/Import',
      method: 'post',
      data: formData
    }).then((res) => {
      console.log('💡💡💡 res: ', res)
      if (res.data.success) {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success(res.data.message);
        this.emitQuery()
        this.handleCancel()
      } else {
        message.error(res.data.message);
        if (res.data.data) {
          errorData.isError = true
          errorData.downLoadUrl = '/api/User/ExportErrorFile?fileName=' + res.data.data
          this.setState({
            errorData
          });
        }
      }
    }).catch((err) => {
      this.setState({
        uploading: false,
      });
      message.error(err.data.message);
    })
  };

  render() {
    const { uploading, fileList, errorData, templateDownLoadUrl } = this.state
    const uploadProps = {
      onRemove: file => {
        let {errorData} = this.state
        errorData = {
          errorId: '',
          isError: false,
          downLoadUrl: ''
        }
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
            errorData
          };
        });
      },
      beforeUpload: file => {
        let {errorData} = this.state
        errorData = {
          errorId: '',
          isError: false,
          downLoadUrl: ''
        }
        this.setState(state => ({
          fileList: [...fileList, file],
          errorData
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Modal
          title="批量导入"
          visible={this.state.isShowImportModal}
          okText="确定"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
        >
          <div className="mb-10">
            <Button type="primary" ghost className="mr-10" href={templateDownLoadUrl} target="_blank">模板下载</Button>
            <Upload {...uploadProps}>
              <Button type="primary">导入</Button>
            </Upload>
          </div>
          <p className="font-12 text-gray-9 pt-10">仅支持上传10M以内的文件</p>
          { errorData.isError ? <Button type="danger" href={errorData.downLoadUrl} target="_blank">下载错误文件</Button> : null }
        </Modal>
      </div>
    );
  }
}

export default BatchImportModal;
