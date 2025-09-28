import { Avatar, Badge, Pagination, Button, Tag, Space } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

const OrdersTable = ({ limit = 5, showActions = false }) => {
  const data = [
    {
      id: "1234",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      amount: 89.99,
      status: "pending",
      date: "2024-01-15",
      items: 2,
      paymentMethod: "Credit Card"
    },
    {
      id: "1235",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      amount: 156.50,
      status: "completed",
      date: "2024-01-15",
      items: 3,
      paymentMethod: "PayPal"
    },
    {
      id: "1236",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      amount: 45.00,
      status: "processing",
      date: "2024-01-14",
      items: 1,
      paymentMethod: "Credit Card"
    },
    {
      id: "1237",
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      amount: 234.75,
      status: "shipped",
      date: "2024-01-14",
      items: 4,
      paymentMethod: "Bank Transfer"
    },
    {
      id: "1238",
      name: "David Brown",
      email: "david@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      amount: 78.25,
      status: "cancelled",
      date: "2024-01-13",
      items: 2,
      paymentMethod: "Credit Card"
    }
  ];

  const displayData = limit ? data.slice(0, limit) : data;


  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "warning", label: "Pending" },
      processing: { color: "processing", label: "Processing" },
      shipped: { color: "blue", label: "Shipped" },
      completed: { color: "success", label: "Completed" },
      cancelled: { color: "error", label: "Cancelled" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return <Tag color={config.color}>{config.label}</Tag>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Table */}
      <div className={limit ? "" : "my-8"}>
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {displayData.map((order, i) => (
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800" key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3 text-sm">
                    <Avatar
                      size="small"
                      src={order.avatar}
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{order.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{order.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900 dark:text-white">#{order.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">${order.amount}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.items} items</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 dark:text-white">
                    {formatDate(order.date)}
                  </span>
                </td>
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Space>
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<EyeOutlined />}
                        title="View Details"
                      />
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<EditOutlined />}
                        title="Edit Order"
                      />
                    </Space>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!limit && (
          <div className="flex justify-end p-4">
            <Pagination showQuickJumper defaultCurrent={1} total={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
