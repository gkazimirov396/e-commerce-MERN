import { useState } from 'react';

import { Button, Divider, Form, Input, Space, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@store/api/authApi';
import { setCredentials } from '@store/authSlice';

import { handleFormErrors } from '@utils/handleFormErrors';

import './Login.scss';

const Login = () => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: isSubmitting }] = useLoginMutation();

  const loginHandler = async formValues => {
    try {
      const result = await login(formValues).unwrap();
      console.log(result);

      dispatch(setCredentials(result?.token));
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
      setErrors({
        ...handleFormErrors(error),
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <section className="login-form">
        <div className="form-container">
          <Typography.Title level={2}>Log In</Typography.Title>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={loginHandler}
          >
            <Form.Item
              name="email"
              label="E-Mail"
              help={errors?.email}
              validateStatus={errors?.email && 'error'}
              rules={[
                {
                  required: true,
                  message: 'This field cannot be empty!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email.',
                },
              ]}
            >
              <Input placeholder="example@examle.com" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              help={errors?.password}
              validateStatus={errors?.password && 'error'}
              rules={[
                {
                  required: true,
                  message: 'This field cannot be empty!',
                },
                {
                  min: 6,
                  message: 'This field cannot be less than 6 characters long!',
                },
              ]}
            >
              <Input.Password placeholder="******" />
            </Form.Item>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-btn"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Log In
              </Button>
              <Typography.Paragraph style={{ textAlign: 'center' }}>
                Don't have an account yet?{' '}
                <Link to="/register">Create Account</Link>
              </Typography.Paragraph>
            </Space>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
