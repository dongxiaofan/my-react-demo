import React from 'react'
import {Card} from 'antd'
import Typing from '@/utils/typing'

class TypingText extends React.Component {
  static defaultProps = {
    title: '',
    source: '',
    height: '',
  }
  componentDidMount(){
    const typing = new Typing({
      source: this.source,
      output: this.output,
      delay: 100
    })
    typing.start()
  }
  render() {
    return (
      <div>
        <div style={{display:'none'}} ref={el => this.source = el} dangerouslySetInnerHTML={{__html:this.props.source}}/>
        <div ref={el => this.output = el} />
      </div>
    )
  }
}

export default TypingText