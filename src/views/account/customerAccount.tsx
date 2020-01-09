import React, {Component} from 'react'
import HOC from './HOC'
import BaseHtml from './baseHtml'

class CustomerAccount extends Component<any,any> {
  constructor(props:any) {
    super(props)
    this.props.getEnhancedState(this.state)
  };

  state:any = {
    powerType: 1
  };

  render () {
    return (
      <div className="clearfix">
        <BaseHtml state={this.state} {...this.props} {...this.props.baseProps}/>
      </div>
    )
  }
}

export default HOC(CustomerAccount)