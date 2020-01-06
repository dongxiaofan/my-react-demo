import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { Form, Col, Select, Input, Icon, Table, Button, Popconfirm, message, DatePicker } from 'antd'
import PolicySupportApi from '@/api/PolicySupport.api'
import TypingText from '@/components/typing/typingText'

const text = `
<div class="font-16 text-gray-9">
  <p>我是龙小九</p>
  <p>当然，这是我随便起的一个名字。</p>
  <p>我的真名其实叫 董晓帆。</p>
  <p>我是一个原则性很强的前端开发，跟同事们团结友爱，但有一个前提是：你不能说我的代码不好。</p>
  <p>如果你觉得我的代码有问题，丑话说在前，你们骂我的电脑可以，不能骂我。</p>
  <p>刷新、关闭浏览器、重启试试</p>
  <p>我平常很少去各种各样的地方旅游，因为我很宅。</p>
  <p>大家技术上有什么不懂的可以来问我，虽然我有时候也不懂，但是我可以学着吹牛逼……  啊呸！我可以去学习</p>
  <p>我非常喜欢尝试新鲜事物，了解各种前端新技术</p>
  <p>这是我用React写的一个小demo。</p>
  <p>如果你想进去看看里面有些什么，可以在地址栏把"about"这几个字母去掉按回车。</p>
  <p>给你一个测试账号</p>
  <p>用户名：<span class="text-danger">admin</span></p>
  <p>密码：<span class="text-danger">123456</span></p>
  <p>看完我的废话后登陆进去玩一下叭</p>
  <p>大爷来呀~</p>
  <p>不过里面的内容是跟HRO云是一样的</p>
  <p>你问我为什么重新写一个HRO云？</p>
  <p>因为我不知道写什么好</p>
  <p>只是为了写个demo玩，没必要亲自画原型凭空捏造一个项目不是？</p>
  <p>毕竟……</p>
  <p>这个demo里面把所有HRO会用到的基本操作和难点都应用到了</p>
  <p>数据都是真实的</p>
  <p>写了这个demo以后</p>
  <p>我觉得我有话要说……</p>
  <p>有一种说法，React是纯粹的JS，因为它采用JSX的语法编写</p>
  <p>所以不支持使用类似Pug的模板引擎，这个有点影响开发效率</p>
  <p>（Pug它不香吗？算了我暂时也造不了react这样的轮子，还是潜心多研究学习吧）</p>
  <p>单向数据流的架构，通过在虚拟DOM中的微操作来实现对实际DOM的局部更新，从而减少与DOM的交互，这无疑提高了性能</p>
  <p>对跨浏览器兼容的问题比较友好。它的模块化把组件隔离，有助于搜索引擎的优化。</p>
  <p>使用React一般需要配合ReactRouter和Flux使用。入门的门槛比较高</p>
  <p>我个人还是更喜欢vue</p>
  <p>双向绑定真的不要太爽</p>
  <p>slot简直10086</p>
  <p>而react两样都没有</p>
  <p>因为人家要万物归原</p>
  <p>听说前端开发框架也有一个鄙视链</p>
  <p>但我觉得，用什么框架需要根据项目以及团队整体情况评估。</p>
  <p>大家都能用得很6的，才是最合适的</p>
  <p></p>
  <p>dxxxxxxxxxxxxxxxxxxxxxxxxx</p>
  <p>dxxxxxxxxxxxxxxxxxxxxxxxxx</p>
  <p>dxxxxxxxxxxxxxxxxxxxxxxxxx</p>
  <p>dxxxxxxxxxxxxxxxxxxxxxxxxx</p>
  <p>dxxxxxxxxxxxxxxxxxxxxxxxxx</p>
  <a class="ant-btn login-form-button ant-btn-primary" href="#/login">去体验</a>
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
      <div className="cont-wrap" id="xxx">
        <TypingText source={text}></TypingText>        
      </div>
    )
  }
}

export default About