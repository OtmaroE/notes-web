import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';


import './Login.css';
import { isLoggedIn } from '../security/Protected';
import { createUser } from '../http-requests';

export default function Register() {

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    const response = await createUser({ email, password, userName: email });
    if (!response || response.message) {
      Modal.error({
        title: response && response.message ? response.message : 'User could not be created please try again later',
      })
    } else {
      Modal.success({
        title: 'User was created successfully, you will now be redirected to the login page',
        onOk: () => {navigate('/')}
      });
    }
  };

  const usernameRules = [
    { required: true, message: 'Please input your email' }
  ];
  const passwordRules = [
    { required: true, message: 'Please input your password' }
  ];

  const loginForm = (
    <div>
      {}
      <Form name='login page' onFinish={handleSubmit}>
        <Form.Item name='email' rules={usernameRules}>
          <Input prefix={<UserOutlined className='site-form-item-icon'/>} placeholder='email'/>
        </Form.Item>
        <Form.Item name='password' rules={passwordRules}>
          <Input prefix={<LockOutlined className='site-form-item-icon'/>} type='password' placeholder='passoword' />
        </Form.Item>
        <Form.Item>
          <Button color='primary' variant="outlined" htmlType='submit' className='login-form-button'>
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div className='login-form'>
      { isLoggedIn() ? navigate('/') : loginForm }
    </div>
  );
}