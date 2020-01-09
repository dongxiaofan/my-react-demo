import React, {Component} from 'react'
import { Row, Col, Card } from 'antd'

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
    };

    state = { //定义可复用的状态
    }

    componentWillMount() {
    };

    render() {
      const props = {
        ...this.props
      };

      return (
        <div className="cont-wrap">
          <WrappedComponent state={this.state} {...props} />
          <p className="text-center pt-40 pb-20 text-gray-9">在React组件的构建过程中，常常有这样的场景，有一类功能需要被不同的组件公用，此时，就涉及抽象的话题，在不同设计理念下，有许多的抽象方法，而针对React，我们重点讨论两种：mixin和高阶组件。</p>
          <Row>
            <Col span={12} className="pr-10">
              <Card title="Mixin">            
                <p>mixin的特性一直广泛存在于各种面向对象语言中。比如在Ruby中，include关键词即是mixin。是将一个模块混入到一个另一个模块中，或是一个类中。</p>
                <p>对于广义的mixin方法，就是用赋值的方式将mixin对象里的方法都挂载到原对象上，来实现对对象的混入。</p>
                <p>然而，使用我们推荐的ES6 classes形势构建组件时，它并不支持mixin。React文档中也未能给出解决方法。社区从0.14版本开始渐渐开始剥离mixin。那么，到底是什么原因导致mixin成为反模式了呢？</p>
                <h3>mixin问题</h3>
                <p>● 破坏了原有组件的封装</p>
                <p>● 命名冲突</p>
                <p>● 增加复杂性</p>
                <p>针对这些困扰，React社区提出来新的方式来取代mixin，那就是高阶组件。</p>
              </Card>
            </Col>
            <Col span={12} className="pl-10">
              <Card title="高阶组件">            
                <p>高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。</p>
                <p>具体而言，高阶组件是参数为组件，返回值为新组件的函数。</p>
                <h3>实现高阶组件的方法</h3>
                <p>● 属性代理（高阶组件通过呗包裹的React组件来操作props）</p>
                <p>组件可以一层层地作为参数被调用，原始组件就具备了高阶组件对它的修饰。就这么简单，保持单个组件封装性的同时还保留了易用性。</p>
                <p>● 反向继承（高阶组件继承于被包裹的React组件）</p>
                <p>高阶组件返回的组件继承于 WrappedComponent 。因为被动地继承了 WrappedComponent，所有的调用都会反向，这也是种方法的由来。</p>
              </Card>
            </Col>
          </Row>
        </div>
      )
    }
  }
}