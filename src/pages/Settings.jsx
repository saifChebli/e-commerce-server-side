import React, { useState } from 'react';
import { HomeOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Form, Input, Button, Switch, Select, InputNumber, message, Divider, Upload } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = async (values) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call later
      console.log('Saving settings:', values);
      message.success('Settings saved successfully!');
    } catch (error) {
      message.error('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSettings = () => {
    form.resetFields();
    message.info('Settings reset to default values');
  };

  return (
    <div className="container p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
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
                { title: "Settings" },
              ]}
            />
          </div>
          <div className="space-x-2">
            <Button icon={<ReloadOutlined />} onClick={handleResetSettings}>
              Reset
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
              onClick={() => form.submit()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Save Settings
            </Button>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveSettings}
          initialValues={{
            storeName: "Boutique 2V Technologies",
            storeEmail: "admin@boutique2v.com",
            storePhone: "+1 (555) 123-4567",
            storeAddress: "123 Business Street, City, State 12345",
            currency: "USD",
            timezone: "America/New_York",
            language: "en",
            maintenanceMode: false,
            allowRegistration: true,
            requireEmailVerification: true,
            lowStockThreshold: 10,
            orderNotificationEmail: "orders@boutique2v.com",
            supportEmail: "support@boutique2v.com",
            facebookUrl: "https://facebook.com/boutique2v",
            twitterUrl: "https://twitter.com/boutique2v",
            instagramUrl: "https://instagram.com/boutique2v",
            youtubeUrl: "https://youtube.com/boutique2v"
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Store Information */}
            <Card title="Store Information">
              <div className="space-y-4">
                <Form.Item
                  name="storeName"
                  label="Store Name"
                  rules={[{ required: true, message: 'Please input store name!' }]}
                >
                  <Input placeholder="Enter store name" />
                </Form.Item>
                <Form.Item
                  name="storeEmail"
                  label="Store Email"
                  rules={[
                    { required: true, message: 'Please input store email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input placeholder="Enter store email" />
                </Form.Item>
                <Form.Item
                  name="storePhone"
                  label="Store Phone"
                >
                  <Input placeholder="Enter store phone number" />
                </Form.Item>
                <Form.Item
                  name="storeAddress"
                  label="Store Address"
                >
                  <TextArea rows={3} placeholder="Enter store address" />
                </Form.Item>
              </div>
            </Card>

            {/* General Settings */}
            <Card title="General Settings">
              <div className="space-y-4">
                <Form.Item
                  name="currency"
                  label="Default Currency"
                >
                  <Select placeholder="Select currency">
                    <Option value="USD">USD - US Dollar</Option>
                    <Option value="EUR">EUR - Euro</Option>
                    <Option value="GBP">GBP - British Pound</Option>
                    <Option value="CAD">CAD - Canadian Dollar</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="timezone"
                  label="Timezone"
                >
                  <Select placeholder="Select timezone">
                    <Option value="America/New_York">Eastern Time (ET)</Option>
                    <Option value="America/Chicago">Central Time (CT)</Option>
                    <Option value="America/Denver">Mountain Time (MT)</Option>
                    <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                    <Option value="Europe/London">London (GMT)</Option>
                    <Option value="Europe/Paris">Paris (CET)</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="language"
                  label="Default Language"
                >
                  <Select placeholder="Select language">
                    <Option value="en">English</Option>
                    <Option value="es">Spanish</Option>
                    <Option value="fr">French</Option>
                    <Option value="de">German</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="lowStockThreshold"
                  label="Low Stock Threshold"
                >
                  <InputNumber
                    min={1}
                    max={100}
                    placeholder="Enter threshold"
                    className="w-full"
                  />
                </Form.Item>
              </div>
            </Card>

            {/* Store Features */}
            <Card title="Store Features">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-gray-600">Temporarily disable store for maintenance</p>
                  </div>
                  <Form.Item name="maintenanceMode" valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Allow Customer Registration</h4>
                    <p className="text-sm text-gray-600">Allow new customers to register accounts</p>
                  </div>
                  <Form.Item name="allowRegistration" valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Require Email Verification</h4>
                    <p className="text-sm text-gray-600">Require customers to verify their email</p>
                  </div>
                  <Form.Item name="requireEmailVerification" valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card title="Notification Settings">
              <div className="space-y-4">
                <Form.Item
                  name="orderNotificationEmail"
                  label="Order Notification Email"
                  rules={[
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input placeholder="Enter email for order notifications" />
                </Form.Item>
                <Form.Item
                  name="supportEmail"
                  label="Support Email"
                  rules={[
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input placeholder="Enter support email" />
                </Form.Item>
              </div>
            </Card>

            {/* Social Media Links */}
            <Card title="Social Media Links" className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="facebookUrl"
                  label="Facebook URL"
                >
                  <Input placeholder="https://facebook.com/yourpage" />
                </Form.Item>
                <Form.Item
                  name="twitterUrl"
                  label="Twitter URL"
                >
                  <Input placeholder="https://twitter.com/yourhandle" />
                </Form.Item>
                <Form.Item
                  name="instagramUrl"
                  label="Instagram URL"
                >
                  <Input placeholder="https://instagram.com/yourhandle" />
                </Form.Item>
                <Form.Item
                  name="youtubeUrl"
                  label="YouTube URL"
                >
                  <Input placeholder="https://youtube.com/yourchannel" />
                </Form.Item>
              </div>
            </Card>

            {/* Store Logo */}
            <Card title="Store Logo" className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Logo</span>
                  </div>
                  <div>
                    <Upload
                      name="logo"
                      listType="text"
                      showUploadList={false}
                      beforeUpload={() => false}
                    >
                      <Button>Upload New Logo</Button>
                    </Upload>
                    <p className="text-sm text-gray-600 mt-1">
                      Recommended size: 200x200px, Max file size: 2MB
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Settings;