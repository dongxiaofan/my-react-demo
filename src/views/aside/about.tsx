import React, {Component} from 'react'
import TypingText from '@/components/typing/typingText'
import '@/assets/styles/about.scss'

const text = `
<div class="font-16 text-gray-9 has-guangbiao-box">
  <p><span>我是龙小九</span></p>
  <p><span>当然，这是我随便起的一个名字。</span></p>
</div>
`

class About extends Component<any,any> {
  constructor(props:any) {
    super(props)
  };

  componentDidMount () {
  }

  state: any = {
  };

  render () {
    return (
      <div className="cont-wrap">
        <TypingText source={text}></TypingText>
        {/* <span className="guangbiao"></span> */}
      </div>
    )
  }
}

export default About