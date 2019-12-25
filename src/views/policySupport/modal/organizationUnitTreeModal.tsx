import React from 'react'
import { Modal, Button, Input, message, Tree, Icon } from 'antd'
import PolicySupportApi from '@/api/PolicySupport.api'

const { TreeNode } = Tree

class OrganizationUnitTreeModal extends React.Component<any> {
  componentDidMount(){
    this.props.onRef(this)
    console.log(this) // ->将child传递给this.props.onRef()方法
    this.getOrganizationUnitTree()
  }

  state = {
    isShowOrganizationUnitTreeModal: false,
    treeData: [],
    checkedKeys: [],
    selectedKeys: []
  };

  emitQuery = () => { // 调用父组件方法
    this.props.query();
    console.log('🧞‍ this.props: ', this.props)
  };

  showModal = () => {
    this.setState({
      isShowOrganizationUnitTreeModal: true,
      checkedKeys: [],
      selectedKeys: []
    });
  };

  handleOk = () => {
    if (this.state.checkedKeys.length) {
      var params = {
        ids: this.props.ids,
        userids: this.state.checkedKeys
      }
      console.log('🍇 params: ', params)
      PolicySupportApi.fileShare(params).then(res => {
        console.log('🍇 res: ', res)
        if (res.code === 200 && res.success) {
          message.success(res.message)
          this.emitQuery()
          this.setState({
            isShowOrganizationUnitTreeModal: false
          })
        }
      })
    } else {
      message.error('请选择要分享的对象')
    }
  };

  handleCancel = () => {
    this.setState({
      isShowOrganizationUnitTreeModal: false,
    });
  };

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.setState({
      selectedKeys: selectedKeys
    })
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    this.setState({
      checkedKeys: checkedKeys
    })
  };

  // 获取组织架构树
  getOrganizationUnitTree = () => {
    PolicySupportApi.getOrganizationUnitTree().then(res => {
      console.log('获取组织架构树: ', res)
      this.setState({
        treeData: res
      })
    })
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    })

  render() {
    return (
      <div>
        <Modal
          title="选择要分享的对象"
          visible={this.state.isShowOrganizationUnitTreeModal}
          okText="确定"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
        >
          {
            this.state.treeData.length > 0 ? (
              <Tree checkable onSelect={this.onSelect} onCheck={this.onCheck}>{this.renderTreeNodes(this.state.treeData)}</Tree>
            ) : (
              'loading tree'
            )
          }
        </Modal>
      </div>
    );
  }
}

export default OrganizationUnitTreeModal;
