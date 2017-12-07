import React from 'react';
import { Form, Input, Button, notification, Icon } from 'antd';
import createHistory from 'history/createHashHistory';

import './index.less'

const FormItem = Form.Item;
const history = createHistory();

class LoginPage extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let n = this.props.form.getFieldsValue().username;
    let p = this.props.form.getFieldsValue().password;
    if (n === 'Test' && p === '123') {
      history.push('/todoList');
    } else {
      this.openNotificationWithIcon('info');
    }
  }

  openNotificationWithIcon = (type) => {
    return notification[type]({
      message: 'Username & Password',
      description: 'Username: Test; Password：123',
      duration: 6,
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    })
  }

  componentDidMount() {
    this.openNotificationWithIcon('info');
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="loginpagewrap">
        <div className="box">
          <p>Welcome to TodoList</p>
          <div className="loginWrap">
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Enter username' }],
                })(
                  <Input placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Enter password' }],
                })(
                  <Input type="password" placeholder="Password" />
                )}
              </FormItem>
              <Button type="primary" htmlType="submit" className="loginBtn">Login</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

let Login = Form.create()(LoginPage);
export default Login;