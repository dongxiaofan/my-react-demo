import React, {Component} from 'react'
import '@/assets/styles/cssEffects.scss'

class CssEffects extends Component<any,any> {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.donghua2()
    this.donghua3()
    this.donghua4()
  }

  state = {
  };

  // 第二个动画效果
  donghua2 = () => {
    let landInTexts:any = document.querySelectorAll(".landIn");
    console.log('landInTexts: ', landInTexts)
    console.log('landInTexts.length: ', landInTexts.length)
    landInTexts.forEach((landInText:any) => {
      let letters = landInText.textContent.split("");
      landInText.textContent = "";
      letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.05}s`;
        landInText.append(span);
      });
    });
  };

  // 第三个动画效果
  donghua3 = () => {
    let duration = 0.8;
    let delay = 0.3;
    let revealText:any = document.querySelector(".reveal");
    let letters = revealText.textContent.split("");
    revealText.textContent = "";
    let middle = letters.filter(e => e !== " ").length / 2;
    letters.forEach((letter, i) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
      revealText.append(span);
    });
  };

  // 第四个动画效果
  donghua4 = () => {
    let glowInTexts:any = document.querySelectorAll(".glowIn");
    glowInTexts.forEach(glowInText => {
      let letters = glowInText.textContent.split("");
      glowInText.textContent = "";
      letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.05}s`;
        glowInText.append(span);
      });
    });
  };

  render() {
    return (
      <div className="cont-wrap">
        <div className="clearfix mb-60">
          <p className="font-12 text-gray-9">第一个动画</p>
          <div className="loading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        <div className="clearfix mb-60">
          <p className="font-12 text-gray-9">第二个动画</p>
          <div className="landIn font-16 font-weight">我是龙小九,我是一个原则性很强的前端开发.</div>
        </div>

        <div className="clearfix mb-60">
          <p className="font-12 text-gray-9">第三个动画</p>
          <div className="reveal font-24 font-weight text-center">我是龙小九,我是一个原则性很强的前端开发.</div>
        </div>

        <div className="clearfix mb-60">
          <p className="font-12 text-gray-9">第四个动画</p>
          <h1 className="glowIn font-24 font-weight text-center">Hello World</h1>
          <p className="glowIn font-24 font-weight">我是龙小九,我是一个原则性很强的前端开发.</p>
        </div>

        <div className="clearfix mb-60">
          <p className="font-12 text-gray-9">第五个动画</p>
        </div>
      </div>
    );
  }
}
export default CssEffects