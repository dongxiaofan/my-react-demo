import React from 'react';
import { connectAlita } from 'redux-alita';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import AccountApi from '@/api/Account.api'

const FormItem = Form.Item;

class Login extends React.Component {
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
  
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				AccountApi.login(values).then(res => {
          console.log('登陆：', res)
          if (res.success) {
						message.success(res.message)
						localStorage.setItem('loginReturn', JSON.stringify(res));
            setTimeout(() => {
              this.props.history.push('/app/roster/rosterList')
            }, 3000)
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
	};

	render() {
    const { getFieldDecorator } = this.props.form

    const formItem = [
      {type: 'input', key: 'username', label: '用户名', placeholder: '请输入用户名', icon: 'user'},
      {type: 'input', key: 'password', label: '密码', placeholder: '请输入密码', icon: 'lock'}
    ]

    const rules = {
      username: [
        { required: true, message: '请输入用户名', whitespace: true, type: 'string' }
      ],
      password: [
        { required: true, message: '请输入密码', whitespace: true, type: 'string' }
      ]
    }

		return (
			<div className="login">
				<div className="login-form">
					<div className="login-title">欢迎登录</div>

					<Form onSubmit={this.handleSubmit}>
            {formItem.map(item =>
              <Form.Item key={item.key}>
                {getFieldDecorator(`${item.key}`, {
                  rules: rules[`${item.key}`]
                })(
                  <Input prefix={<Icon type={item.icon} placeholder={item.placeholder}/>} />
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
