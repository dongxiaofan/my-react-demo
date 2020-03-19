import React from 'react';
import { connectAlita } from 'redux-alita';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import AccountApi from '@/api/Account.api'
import SysAreaApi from '@/api/SysArea.api'
import { any, string } from 'prop-types';

const FormItem = Form.Item;

class Login extends React.Component<any, any> {
	componentDidMount() {
  }
  
	componentDidUpdate() {
		const { auth: nextAuth = {}, history } = this.props;

		if (nextAuth.data && nextAuth.data.uid) {
			console.log('🐟 nextAuth: ', nextAuth)
			// 判断是否登陆
			localStorage.setItem('user', JSON.stringify(nextAuth.data));
			history.push('/');
		}
  }
  
	handleSubmit = (e:any) => {
		e.preventDefault();
		this.props.form.validateFields((err:any, values:any) => {
			if (!err) {
				AccountApi.login(values).then(res => {
          console.log('登陆：', res)
          if (res.success) {
						message.success(res.message)
						localStorage.setItem('loginReturn', JSON.stringify(res))

						this.getProvince()
						this.getAreaTree()

            setTimeout(() => {
              this.props.history.push('/app/home')
            })
          } else {
            message.error(res.message)
          }
        }).catch(err => {
          message.error(err.message)
        })
			} else {
				console.log('🌼 🌼 🌼 🌼');
			}
		});
	}	

  // 获取全国省份
  async getProvince () {
    let res = await SysAreaApi.getProvince()
    if (res.success) {
      localStorage.setItem('provinceList', JSON.stringify(res.data))
    }
  }

  // 获取中国所有城市树
  async getAreaTree () {
    let res = await SysAreaApi.getAreaTree()
    console.log('获取中国所有城市树: ', res)
    if (res.success) {
      localStorage.setItem('areaTree', JSON.stringify(res.data))
    } else {
    }
  }

	render() {
    const { getFieldDecorator } = this.props.form

    const formItem = [
      {type: 'input', model: 'username', label: '用户名', placeholder: '请输入用户名', icon: 'user'},
      {type: 'input', model: 'password', label: '密码', placeholder: '请输入密码', icon: 'lock'}
    ]

    const rules:any = {
      username: [
        { required: true, message: '请输入用户名', whitespace: true, type: 'string' }
      ],
      password: [
        { required: true, message: '请输入密码', whitespace: true, type: 'string' }
      ]
    }

    let getSnow = (num) => {
      var res:any = [];
      for (var i = 0; i < num; i++) {
        res.push(<div key={i} className="snow">x</div>)
      }
      return res
    }

		return (
			<div className="login">
        <div className="snow-wrap">
          { getSnow(30) }
        </div>

				<div className="login-form">
					<div className="login-title">欢迎登录</div>

					<Form onSubmit={this.handleSubmit}>
            {formItem.map(item =>
              <Form.Item key={item.model}>
                {getFieldDecorator(`${item.model}`, {
                  rules: rules[`${item.model}`]
                })(
                  <Input prefix={<Icon type={item.icon}/>} placeholder={item.placeholder} type={item.model === 'password' ? 'password' : 'text'} />
                )}
              </Form.Item>
            )}
						<FormItem>
							<div className="mb-16">
								{getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true,
								})(<Checkbox>记住我</Checkbox>)}
							</div>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
								style={{ width: '100%' }}
							>登录</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
}

export default connectAlita(['auth'])(Form.create()(Login));
