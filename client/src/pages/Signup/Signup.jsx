import { useState } from 'react';

import { Button, Divider, Form, Input, Space, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import { useSignupMutation } from '@store/api/authApi';

import { handleFormErrors } from '@utils/handleFormErrors';

import './Signup.scss';

const Signup = () => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const [signup, { isLoading: isSubmitting }] = useSignupMutation();

  const signupHandler = async formValues => {
    try {
      const result = await signup(formValues).unwrap();
      console.log(result);

      navigate('/login');
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
        <title>Register</title>
      </Helmet>

      <section className="signup-form">
        <div className="form-container">
          <Typography.Title level={2}>Sign Up</Typography.Title>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={signupHandler}
          >
            <Form.Item
              name="name"
              label="Username"
              help={errors?.name}
              validateStatus={errors?.name && 'error'}
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'This field cannot be empty!',
                },
              ]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
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
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              help={errors?.confirmPassword}
              validateStatus={errors?.confirmPassword && 'error'}
              rules={[
                {
                  required: true,
                  message: 'This field cannot be empty!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The passwords have to match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="******" />
            </Form.Item>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-btn"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
              <Typography.Paragraph style={{ textAlign: 'center' }}>
                Already have an account? <Link to="/login">Sign In</Link>
              </Typography.Paragraph>
            </Space>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Signup;
