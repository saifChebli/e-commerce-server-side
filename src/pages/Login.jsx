import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Boutique 2V Technologies.webp';

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await login(values.email, values.password);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 rounded-2xl bg-white dark:bg-gray-800">
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="Boutique 2V Technologies"
              className="w-20 h-20 mx-auto mb-4 object-cover rounded-full"
            />
            <Title level={2} className="text-purple-600 dark:text-purple-400 mb-2">
              Welcome Back
            </Title>
            <Text type="secondary" className="text-lg dark:text-gray-300">
              Sign in to your admin dashboard
            </Text>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="mb-6"
              closable
              onClose={() => setError('')}
            />
          )}

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="space-y-6"
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="admin@example.com"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                className="rounded-lg"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 rounded-lg bg-purple-600 hover:bg-purple-700 border-0 font-semibold text-lg"
                loading={loading}
              >
                {loading ? <Spin size="small" /> : 'Sign In'}
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center">
            <Text type="secondary" className="text-sm dark:text-gray-400">
              Demo credentials: admin@example.com / admin123
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
