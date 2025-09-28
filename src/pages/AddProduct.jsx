import React, { useState } from 'react';
import { HomeOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Form, Input, Select, InputNumber, Upload, message, Switch, Divider } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call later
      console.log('Adding product:', values);
      message.success('Product added successfully!');
      form.resetFields();
      setImageList([]);
    } catch (error) {
      message.error('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture-card',
    fileList: imageList,
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
      setImageList(info.fileList);
    },
    onPreview: async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    },
  };

  return (
    <div className="container p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Add New Product</h1>
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
              { title: "Products" },
              { title: "Add New Product" },
            ]}
          />
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: true,
            featured: false,
            weight: 0,
            dimensions: { length: 0, width: 0, height: 0 }
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Product Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card title="Product Information">
                <div className="space-y-4">
                  <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[{ required: true, message: 'Please input product name!' }]}
                  >
                    <Input placeholder="Enter product name" size="large" />
                  </Form.Item>

                  <Form.Item
                    name="shortDescription"
                    label="Short Description"
                    rules={[{ required: true, message: 'Please input short description!' }]}
                  >
                    <TextArea rows={3} placeholder="Enter a brief description of the product" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Full Description"
                    rules={[{ required: true, message: 'Please input full description!' }]}
                  >
                    <TextArea rows={6} placeholder="Enter detailed product description" />
                  </Form.Item>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="price"
                      label="Price"
                      rules={[{ required: true, message: 'Please input price!' }]}
                    >
                      <InputNumber
                        prefix="$"
                        placeholder="0.00"
                        className="w-full"
                        min={0}
                        step={0.01}
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="comparePrice"
                      label="Compare at Price"
                    >
                      <InputNumber
                        prefix="$"
                        placeholder="0.00"
                        className="w-full"
                        min={0}
                        step={0.01}
                        size="large"
                      />
                    </Form.Item>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="sku"
                      label="SKU"
                      rules={[{ required: true, message: 'Please input SKU!' }]}
                    >
                      <Input placeholder="Enter product SKU" />
                    </Form.Item>
                    <Form.Item
                      name="barcode"
                      label="Barcode"
                    >
                      <Input placeholder="Enter product barcode" />
                    </Form.Item>
                  </div>
                </div>
              </Card>

              <Card title="Product Images">
                <Form.Item name="images">
                  <Upload {...uploadProps}>
                    {imageList.length >= 8 ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                <p className="text-sm text-gray-600 mt-2">
                  Upload up to 8 images. First image will be the main product image.
                </p>
              </Card>

              <Card title="Inventory">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="stock"
                      label="Stock Quantity"
                      rules={[{ required: true, message: 'Please input stock quantity!' }]}
                    >
                      <InputNumber
                        placeholder="0"
                        className="w-full"
                        min={0}
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="lowStockThreshold"
                      label="Low Stock Alert"
                    >
                      <InputNumber
                        placeholder="5"
                        className="w-full"
                        min={0}
                        size="large"
                      />
                    </Form.Item>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Track Quantity</h4>
                      <p className="text-sm text-gray-600">Track inventory for this product</p>
                    </div>
                    <Form.Item name="trackQuantity" valuePropName="checked" className="mb-0">
                      <Switch defaultChecked />
                    </Form.Item>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Allow Backorder</h4>
                      <p className="text-sm text-gray-600">Allow customers to purchase when out of stock</p>
                    </div>
                    <Form.Item name="allowBackorder" valuePropName="checked" className="mb-0">
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card title="Product Status">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Active</h4>
                      <p className="text-sm text-gray-600">Make this product available for sale</p>
                    </div>
                    <Form.Item name="status" valuePropName="checked" className="mb-0">
                      <Switch defaultChecked />
                    </Form.Item>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Featured</h4>
                      <p className="text-sm text-gray-600">Show this product in featured section</p>
                    </div>
                    <Form.Item name="featured" valuePropName="checked" className="mb-0">
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
              </Card>

              <Card title="Organization">
                <div className="space-y-4">
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select category!' }]}
                  >
                    <Select placeholder="Select category" size="large">
                      <Option value="electronics">Electronics</Option>
                      <Option value="clothing">Clothing</Option>
                      <Option value="home">Home & Garden</Option>
                      <Option value="sports">Sports & Outdoors</Option>
                      <Option value="books">Books</Option>
                      <Option value="toys">Toys & Games</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="subcategory"
                    label="Subcategory"
                  >
                    <Select placeholder="Select subcategory" size="large">
                      <Option value="smartphones">Smartphones</Option>
                      <Option value="laptops">Laptops</Option>
                      <Option value="headphones">Headphones</Option>
                      <Option value="cameras">Cameras</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="tags"
                    label="Tags"
                  >
                    <Select
                      mode="tags"
                      placeholder="Add tags"
                      size="large"
                    />
                  </Form.Item>
                </div>
              </Card>

              <Card title="Shipping">
                <div className="space-y-4">
                  <Form.Item
                    name="weight"
                    label="Weight (lbs)"
                  >
                    <InputNumber
                      placeholder="0.0"
                      className="w-full"
                      min={0}
                      step={0.1}
                      size="large"
                    />
                  </Form.Item>

                  <div>
                    <h4 className="font-medium mb-2">Dimensions (inches)</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Form.Item name={['dimensions', 'length']} className="mb-0">
                        <InputNumber placeholder="L" className="w-full" min={0} />
                      </Form.Item>
                      <Form.Item name={['dimensions', 'width']} className="mb-0">
                        <InputNumber placeholder="W" className="w-full" min={0} />
                      </Form.Item>
                      <Form.Item name={['dimensions', 'height']} className="mb-0">
                        <InputNumber placeholder="H" className="w-full" min={0} />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="space-y-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    icon={<PlusOutlined />}
                  >
                    Add Product
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => form.resetFields()}
                  >
                    Reset Form
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
