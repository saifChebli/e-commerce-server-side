import React, { useState } from 'react';
import { HomeOutlined, UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Form, Input, Button, Avatar, Upload, message, Divider, Switch } from 'antd';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call later
      const updatedUser = { ...user, ...values };
      updateUser(updatedUser);
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call later
      console.log('Changing password:', values);
      message.success('Password changed successfully!');
    } catch (error) {
      message.error('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('Avatar updated successfully!');
      }
    },
  };

  return (
    <div className="container p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Your Profile</h1>
          <Breadcrumb
            items={[
              {
                href: "/",
                title: (
                  <>
                    <HomeOutlined />
                    <span>Home</span>
                  </>
                ),
              },
              { title: "Profile" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card>
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar
                  size={120}
                  src={user?.avatar}
                  icon={<UserOutlined />}
                  className="bg-purple-100"
                />
                <Upload {...uploadProps} className="absolute bottom-0 right-0">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<UserOutlined />}
                    size="small"
                    className="bg-purple-600"
                  />
                </Upload>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{user?.name || 'Admin User'}</h3>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              </div>
              <Divider />
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last login:</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card title="Personal Information">
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  name: user?.name || '',
                  email: user?.email || '',
                  phone: '+1 (555) 123-4567',
                  bio: 'E-commerce admin with 5+ years of experience in managing online stores and customer relations.'
                }}
                onFinish={handleUpdateProfile}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                  </Form.Item>
                </div>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                </Form.Item>
                <Form.Item
                  name="bio"
                  label="Bio"
                >
                  <Input.TextArea rows={3} placeholder="Tell us about yourself" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            {/* Change Password */}
            <Card title="Change Password">
              <Form
                layout="vertical"
                onFinish={handleChangePassword}
              >
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Enter current password" />
                </Form.Item>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please input your new password!' },
                      { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Enter new password" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'Please confirm your new password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm new password" />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            {/* Notification Settings */}
            <Card title="Notification Settings">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Order Updates</h4>
                    <p className="text-sm text-gray-600">Get notified about new orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Customer Messages</h4>
                    <p className="text-sm text-gray-600">Receive customer chat notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Low Stock Alerts</h4>
                    <p className="text-sm text-gray-600">Get notified when products are low in stock</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;