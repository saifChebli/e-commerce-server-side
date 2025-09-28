import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Button, Tag, InputNumber, message, Divider } from 'antd';
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/solid';

const SingleProduct = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock product data - replace with API call later
  const product = {
    id: id,
    name: "Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    shortDescription: "Premium wireless headphones with noise cancellation",
    category: "Electronics",
    subCategory: "Audio",
    stock: 25,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://vetra.laborasyon.com/assets/images/products/1.jpg",
      "https://vetra.laborasyon.com/assets/images/products/2.jpg",
      "https://vetra.laborasyon.com/assets/images/products/3.jpg"
    ],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge (5 min = 3 hours)",
      "Premium materials",
      "Comfortable fit"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 ohms",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Weight": "250g"
    }
  };

  const handleUpdateStock = () => {
    message.success('Stock updated successfully!');
  };

  const handleDeleteProduct = () => {
    message.success('Product deleted successfully!');
  };

  return (
    <div className="container p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Product Details</h1>
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
                { title: product.name },
              ]}
            />
          </div>
          <Link to="/all-products">
            <Button icon={<ArrowLeftOutlined />}>
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <Card>
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Product Info */}
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-3xl font-bold text-purple-600">${product.price}</span>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <Tag color="red">25% OFF</Tag>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                  <Tag color={product.stock > 0 ? "green" : "red"}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Tag>
                </div>

                <p className="text-gray-700">{product.description}</p>

                <Divider />

                <div>
                  <h3 className="font-semibold mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>

                <Divider />

                <div>
                  <h3 className="font-semibold mb-2">Stock Management:</h3>
                  <div className="flex items-center space-x-4">
                    <span>Current Stock: <strong>{product.stock}</strong></span>
                    <InputNumber
                      min={0}
                      value={quantity}
                      onChange={setQuantity}
                      className="w-24"
                    />
                    <Button type="primary" onClick={handleUpdateStock}>
                      Update Stock
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="primary"
                    icon={<PencilSquareIcon className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Edit Product
                  </Button>
                  <Button
                    danger
                    icon={<TrashIcon className="w-4 h-4" />}
                    onClick={handleDeleteProduct}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>

            {/* Specifications */}
            <Card title="Specifications">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium text-gray-600">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;