import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'contexts/auth';
import { Form, Input, Button, Row, Col } from 'antd';

const Login = () => {
  const history = useHistory();
  const { login, user, loading } = useAuth();

  useEffect(() => {
    if (Object.keys(user)?.length > 0) {
      history.push('/dashboard');
    }
  }, []);

  const onFinish = (values) => {
    login(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify={'center'} align={'middle'} style={{ height: '300px' }}>
      <Col lg={24} style={{ textAlign: 'center' }}>
        <h2>Login</h2>
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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
            <a href={'/register'} style={{ marginLeft: 16 }}>
              Register
            </a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
