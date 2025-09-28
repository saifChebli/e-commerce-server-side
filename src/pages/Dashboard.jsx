import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Select, 
  DatePicker, 
  Button, 
  Space, 
  Progress, 
  List, 
  Avatar, 
  Tag, 
  Typography,
  Tooltip,
  Badge
} from 'antd';
import { 
  ShoppingCartOutlined, 
  DollarOutlined, 
  UserOutlined, 
  EyeOutlined,
  DownOutlined,
  CalendarOutlined,
  FilterOutlined,
  ReloadOutlined,
  UpOutlined
} from '@ant-design/icons';
import { 
  ShoppingCartIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
  
} from '@heroicons/react/24/solid';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import OrdersTable from '../components/Table/OrdersTable';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text, Title: AntTitle } = Typography;

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([dayjs().subtract(30, 'day'), dayjs()]);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with API calls later
  const stats = {
    totalOrders: 1247,
    totalRevenue: 45680,
    totalCustomers: 892,
    conversionRate: 3.2,
    avgOrderValue: 36.6,
    totalProducts: 156,
    lowStockProducts: 12,
    pendingOrders: 23,
    completedOrders: 1156
  };

  const previousStats = {
    totalOrders: 1180,
    totalRevenue: 42100,
    totalCustomers: 845,
    conversionRate: 2.8,
    avgOrderValue: 35.7
  };

  const calculateGrowth = (current, previous) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const growth = {
    orders: calculateGrowth(stats.totalOrders, previousStats.totalOrders),
    revenue: calculateGrowth(stats.totalRevenue, previousStats.totalRevenue),
    customers: calculateGrowth(stats.totalCustomers, previousStats.totalCustomers),
    conversion: calculateGrowth(stats.conversionRate, previousStats.conversionRate),
    aov: calculateGrowth(stats.avgOrderValue, previousStats.avgOrderValue)
  };

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 29000, 35000, 38000, 45680],
        borderColor: '#8B4513',
        backgroundColor: 'rgba(139, 69, 19, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const ordersData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [45, 52, 38, 67, 89, 95, 78],
        backgroundColor: '#8B4513',
        borderColor: '#8B4513',
        borderWidth: 1,
      },
    ],
  };

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Others'],
    datasets: [
      {
        data: [35, 25, 15, 12, 8, 5],
        backgroundColor: [
          '#8B4513',
          '#D2691E',
          '#CD853F',
          '#DEB887',
          '#F5DEB3',
          '#FFE4B5',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      message: 'New order #1234 received from John Doe',
      time: '2 minutes ago',
      amount: '$89.99',
      status: 'pending'
    },
    {
      id: 2,
      type: 'customer',
      message: 'New customer Sarah Wilson registered',
      time: '15 minutes ago',
      amount: null,
      status: 'success'
    },
    {
      id: 3,
      type: 'product',
      message: 'Product "Wireless Headphones" is low in stock',
      time: '1 hour ago',
      amount: null,
      status: 'warning'
    },
    {
      id: 4,
      type: 'order',
      message: 'Order #1233 has been completed',
      time: '2 hours ago',
      amount: '$156.50',
      status: 'success'
    },
    {
      id: 5,
      type: 'customer',
      message: 'Customer Mike Johnson left a review',
      time: '3 hours ago',
      amount: null,
      status: 'info'
    }
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 45, revenue: '$2,250' },
    { name: 'Smart Watch', sales: 38, revenue: '$1,900' },
    { name: 'Laptop Stand', sales: 32, revenue: '$960' },
    { name: 'Phone Case', sales: 28, revenue: '$420' },
    { name: 'Bluetooth Speaker', sales: 25, revenue: '$1,250' }
  ];

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
    // Update date range based on selection
    const now = dayjs();
    switch (value) {
      case '7d':
        setDateRange([now.subtract(7, 'day'), now]);
        break;
      case '30d':
        setDateRange([now.subtract(30, 'day'), now]);
        break;
      case '90d':
        setDateRange([now.subtract(90, 'day'), now]);
        break;
      case '1y':
        setDateRange([now.subtract(1, 'year'), now]);
        break;
      default:
        break;
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
        }
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
        }
      },
    },
  };

  return (
    <div className="container p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <Space>
          <Select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            style={{ width: 120 }}
          >
            <Option value="7d">Last 7 days</Option>
            <Option value="30d">Last 30 days</Option>
            <Option value="90d">Last 90 days</Option>
            <Option value="1y">Last year</Option>
          </Select>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            format="MMM DD, YYYY"
          />
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
          >
            Refresh
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined className="text-blue-500" />}
              suffix={
                <span className={`text-sm ${parseFloat(growth.orders) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <UpOutlined className="mr-1" />
                  {growth.orders}%
                </span>
              }
            />
            <div className="mt-2">
              <Text type="secondary">vs last period</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              precision={0}
              prefix={<DollarOutlined className="text-green-500" />}
              suffix={
                <span className={`text-sm ${parseFloat(growth.revenue) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <UpOutlined className="mr-1" />
                  {growth.revenue}%
                </span>
              }
            />
            <div className="mt-2">
              <Text type="secondary">vs last period</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={stats.totalCustomers}
              prefix={<UserOutlined className="text-purple-500" />}
              suffix={
                <span className={`text-sm ${parseFloat(growth.customers) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <UpOutlined className="mr-1" />
                  {growth.customers}%
                </span>
              }
            />
            <div className="mt-2">
              <Text type="secondary">vs last period</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={stats.conversionRate}
              precision={1}
              prefix={<EyeOutlined className="text-orange-500" />}
              suffix={
                <span className={`text-sm ${parseFloat(growth.conversion) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <UpOutlined className="mr-1" />
                  {growth.conversion}%
                </span>
              }
            />
            <div className="mt-2">
              <Text type="secondary">vs last period</Text>
          </div>
          </Card>
        </Col>
      </Row>

      {/* Additional Stats */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card>
            <div className="flex items-center justify-between">
          <div>
                <Text type="secondary">Average Order Value</Text>
                <div className="text-2xl font-bold">${stats.avgOrderValue}</div>
                <Text type="secondary" className="text-sm">
                  <span className={parseFloat(growth.aov) >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {growth.aov}% vs last period
                  </span>
                </Text>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <Text type="secondary">Low Stock Products</Text>
                <div className="text-2xl font-bold text-orange-500">{stats.lowStockProducts}</div>
                <Text type="secondary" className="text-sm">Need attention</Text>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <ChartBarIcon className="w-6 h-6 text-orange-600" />
              </div>
          </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div className="flex items-center justify-between">
          <div>
                <Text type="secondary">Pending Orders</Text>
                <div className="text-2xl font-bold text-yellow-500">{stats.pendingOrders}</div>
                <Text type="secondary" className="text-sm">Awaiting processing</Text>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <ShoppingCartIcon className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card title="Revenue Trend" extra={<CalendarOutlined />}>
            <div style={{ height: '300px' }}>
              <Line data={revenueData} options={chartOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Sales by Category">
            <div style={{ height: '300px' }}>
              <Doughnut data={categoryData} options={doughnutOptions} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="Weekly Orders">
            <div style={{ height: '250px' }}>
              <Bar data={ordersData} options={chartOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Selling Products">
            <List
              dataSource={topProducts}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#8B4513' }}>{index + 1}</Avatar>}
                    title={item.name}
                    description={`${item.sales} sales`}
                  />
                  <div className="text-right">
                    <div className="font-semibold">{item.revenue}</div>
                    <Progress 
                      percent={(item.sales / 45) * 100} 
                      size="small" 
                      showInfo={false}
                      strokeColor="#8B4513"
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activities and Orders */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Recent Activities" extra={<Badge count={3} />}>
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        style={{ 
                          backgroundColor: item.status === 'success' ? '#52c41a' : 
                                          item.status === 'warning' ? '#faad14' : 
                                          item.status === 'info' ? '#1890ff' : '#f5222d'
                        }}
                        icon={
                          item.type === 'order' ? <ShoppingCartOutlined /> :
                          item.type === 'customer' ? <UserOutlined /> :
                          <ChartBarIcon className="w-4 h-4" />
                        }
                      />
                    }
                    title={item.message}
                    description={
                      <div className="flex justify-between items-center">
                        <Text type="secondary" className="text-xs">{item.time}</Text>
                        {item.amount && <Text strong>{item.amount}</Text>}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Card 
            title="Recent Orders" 
            extra={
              <Button type="link" href="/orders">
                View All
              </Button>
            }
          >
            <OrdersTable limit={5} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
