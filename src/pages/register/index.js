import React, { useState } from 'react';
import { useAuth } from 'contexts/auth';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { registerApi } from 'src/services/apis';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values) => {
    delete values.confirmPassword;
    setLoading(true);
    try {
      await registerApi(values);
      login({
        email: values.email,
        password: values.password,
      });
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify={'center'} align={'middle'} style={{ height: '300px' }}>
      <Col lg={24} style={{ textAlign: 'center' }}>
        <h2>Register</h2>
      </Col>
      <Col lg={12}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
            <a href={'/'} style={{ marginLeft: 16 }}>
              Login
            </a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
