import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';


import './Login.css';
import { isLoggedIn } from '../security/Protected';
import { login } from '../http-requests';

export default function Login() {
  const [loginError, setLoginError] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      const response = await login(username, password);
      if(response.status !== 200) {
        setLoginError(true);
      } else {
        setLoginError(false);
        const token = await response.text();
        localStorage.setItem('token', token);
        navigate('/');
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  const usernameRules = [
    { required: true, message: 'Please input your username' }
  ];
  const passwordRules = [
    { required: true, message: 'Please input your password' }
  ];

  const loginForm = (
    <Form name='login page' onFinish={handleSubmit}>
      <Form.Item name='username' rules={usernameRules}>
        <Input prefix={<UserOutlined className='site-form-item-icon'/>} placeholder='username'/>
      </Form.Item>
      <Form.Item name='password' rules={passwordRules}>
        <Input prefix={<LockOutlined className='site-form-item-icon'/>} type='password' placeholder='passoword' />
        {loginError && <div className='error-message'>username or password is wrong!</div>}
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a className='login-form-forgot' href=''>
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
        Or <a href='' >Register now!</a>
      </Form.Item>
    </Form>
  );

  return (
    <div id='login-form'>
      { isLoggedIn() ? navigate('/') : loginForm }
    </div>
  );
}