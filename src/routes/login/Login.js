/**
 * Created by Jason on 2018/2/1.
 */
import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, message } from 'antd';
import { connect } from 'dva';

import styles from './login.less';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  componentDidMount() {
    this.inputRef.input.focus();
  }
  inputRef = undefined;
  componentDidUpdate() {
    setTimeout(() => this.loginSuccess(), 2000);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onLoading(values);

      }
    });
  };
  onLoading = values => {
    this.setState({
      onLoading: true
    });
    this.props.dispatch({
      type: 'login/onLogin',
      payload: values
    });
  };
  onUserNameChange = e => {
    let username = e.target.value;
    username = username.trim();
    this.setState({
      username
    });
  };
  onPasswordChange = e => {
    let password = e.target.value;
    password = password.trim();
    this.setState({
      password
    });
    this.props.form.setFieldsValue({
      password
    });
  };

  loginSuccess() {
    if (this.props.isLogin && !this.props.hasError) {
      window.jump();

    } else if (this.props.hasError) {
      message.destroy();
      Modal.warning({
        title: '登录失败',
        content: this.props.errorMsg,
        okText: '确定',
        onOk: this.handleOk
      });
      this.props.dispatch({
        type: 'login/clearMsg'
      });
    }
  }
  clearPassword = () => {
    this.setState({
      password: ''
    });
    this.props.form.setFieldsValue({
      password: ''
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginContainer}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <div className={styles.loginTitle}></div>

          <FormItem style={{ width: '37%', margin: '0 auto' }}>
            <label className={styles.formLabel}>用户名</label>

            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入正确的用户名！' }]
            })(
              <Input
                ref={c => (this.inputRef = c)}
                suffix={this.state.username ? <Icon
                  type="check"
                  className={styles.userNameIcon}
                /> : null}
                onChange={this.onUserNameChange} />
            )}
          </FormItem>
          <FormItem style={{ width: '37%', margin: '0 auto' }}>
            <label className={styles.formLabel}>登录密码</label>
            {getFieldDecorator('password', {
              initialValue: this.state.password,
              rules: [{ required: true, message: '请输入正确的密码！' }]
            })(
              <Input
                type="password"
                value={this.state.password}
                suffix={this.state.password ? <Icon
                  type="close-circle"
                  className={styles.closeIcon}
                  onClick={this.clearPassword}
                /> : null}
                onChange={this.onPasswordChange}
              />
            )}
          </FormItem>
          <FormItem style={{ width: '37%', margin: '0 auto' }}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>记住密码</Checkbox>
            )}

            <div className={styles.submitContain}>
              <Button loading={this.props.loading} type="primary" htmlType="submit" className={styles.submitBtn}>登 录</Button>
            </div>

          </FormItem>
        </Form>
      </div>
    );
  }
}
function mapStateToProps({ login }) {
  return { ...login };
}

const mapPropsLogin = Form.create()(Login);

export default connect(mapStateToProps)(mapPropsLogin);
