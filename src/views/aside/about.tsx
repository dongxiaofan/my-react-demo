import React, {Component} from 'react'
import TypingText from '@/components/typing/typingText'
import '@/assets/styles/about.scss'

const text = `
<div class="font-16 text-gray-9">
  <p>我是龙小九</p>
  <p>当然，这是我随便起的一个名字。</p>
  <p>我的真名其实叫 董晓帆。</p>
  <p>我是一个原则性很强的前端开发，跟同事们团结友爱，但有一个前提是：你不能说我的代码不好。</p>
  <p>如果你觉得我的代码有问题，丑话说在前，你们骂我的电脑可以，不能骂我。</p>
  <div class="meme meme1"></div>
  <p>刷新、关闭浏览器、重启试试</p>
  <p>我平常很少去各种各样的地方旅游，因为我很宅。</p>
  <p>大家技术上有什么不懂的可以来问我，虽然我有时候也不懂，但是我可以学着吹牛逼……  啊呸！我可以去学习</p>
  <p>我非常喜欢尝试新鲜事物，了解各种前端新技术</p>
  <p>这是我用React写的一个小demo。</p>
  <p>如果你想进去看看里面有些什么，可以在看我唠嗑完以后，点击我为你准备的按钮去体验一下</p>
  <p>大爷来呀~</p>
  <div class="meme meme2"></div>
  <p>不过里面的内容是跟HRO云是一样的</p>
  <p>你问我为什么重新写一个HRO云？</p>
  <p>因为我不知道写什么好</p>
  <p>只是为了写个demo玩，没必要亲自画原型凭空捏造一个项目不是？</p>
  <p>毕竟……</p>
  <p>这个demo里面把所有HRO会用到的基本操作和难点都应用到了</p>
  <p>数据都是真实的</p>
  <p>写了这个demo以后</p>
  <p>我觉得我有话要说……</p>
  <p>算了还是不在这里说了吧，有什么话不能当面好好聊呢？</p>
  <a class="ant-btn login-form-button ant-btn-primary mb-20" href="#/login">去体验</a>
  <p>按钮已经给你了，但我建议你不用点。因为即使看到了登录页，你也没办法进去</p>
  <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈！</p>
  <div class="meme meme3"></div>
  <p>因为接口涉及到跨域</p>
  <p>而我</p>
  <p>把这个页面部署到了git上</p>
  <div class="meme meme4"></div>
  <p>只有部署在自己的服务器上时，才能进入系统操作</p>
  <p>你问我为啥不自己租个服务器？</p>
  <p>我怕花钱啊</p>
  <p>什么？你想找我聊聊？</p>
  <p>我的支付宝账号是394276877@qq.com</p>
  <p>哦不对不对</p>
  <p>我的电话是 <span class="text-danger font-18 font-weight">15869796697</span></p>
  <p>在聊理想前，可以看看我开发的几个项目</p>
  <div class="meme meme5"></div>
  <p>HRO Cloud： <a class="text-info" href="https://www.vxhro.com/">https://www.vxhro.com/</a></p>
  <p>分享招聘PC企业端： <a class="text-info" href="https://www.fx-zp.com/enter/login">https://www.fx-zp.com/enter/login</a></p>
  <ul class="qrcodeList mb-30">
    <li><div class="img-qrcode guwenban"></div><p>分享招聘顾问版</p></li>
    <li><div class="img-qrcode qiuzhiban"></div><p>分享招聘求职版</p></li>
    <li><div class="img-qrcode qiyeban"></div><p>分享招聘企业版</p></li>
  </ul>
  <p>另外……</p>
  <p>还有一些……</p>
  <p>emmmmmmmm……</p>
  <p>你懂的</p>
  <p>外包项目</p>
  <div class="meme meme6"></div>
  <p>外包项目我觉得没有必要全说出来</p>
  <p>就说一个我觉得比较有意思的好了~</p>
  <p>现在 avbd~~~~  请打开你的手机</p>
  <p>搜索公众号“中通国医”</p>
  <p>对，你要关注它，才能体验这个</p>
  <p>我真不是在打广告，我用我的美貌发誓</p>
  <p>关注以后，点击右下角“APP > 商城”</p>
  <div class="meme meme-ztgt1"></div>
  <p>进入首页，点击“立即就诊”</p>
  <div class="meme meme-ztgt2"></div>
  <p>会随机分配一个医生问诊，你可以跟医生唠个5毛钱的嗑，或者请医生给你发个测试药方，然后按照提示，一步一步付款……</p>
  <p>不是骗钱，真不是骗钱</p>
  <p>测试药方0.01元，对吧，我没有骗你。</p>
  <p>？？？？？？？？？？？   你要我还你这0.01块？</p>
  <p>行叭，加个微信我转你~</p>
  <p>🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂</p>
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