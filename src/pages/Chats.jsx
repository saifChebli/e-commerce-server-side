import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Input, Button, Avatar, Badge, List, Typography, Space } from 'antd';
import { PaperAirplaneIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/24/solid';

const { Text } = Typography;

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  // Mock chat data - replace with API call later
  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hi, I have a question about my order",
      time: "2 min ago",
      unread: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      online: true
    },
    {
      id: 2,
      name: "Sarah Wilson",
      lastMessage: "Thank you for the quick delivery!",
      time: "1 hour ago",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      online: false
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Can I get a refund for this item?",
      time: "3 hours ago",
      unread: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      online: true
    },
    {
      id: 4,
      name: "Emily Davis",
      lastMessage: "The product quality is amazing!",
      time: "1 day ago",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      online: false
    }
  ];

  const messages = [
    { id: 1, text: "Hi, I have a question about my order", sender: "customer", time: "2:30 PM" },
    { id: 2, text: "Hello! I'd be happy to help you with your order. What's your order number?", sender: "admin", time: "2:31 PM" },
    { id: 3, text: "It's #12345. I haven't received any updates on shipping", sender: "customer", time: "2:32 PM" },
    { id: 4, text: "Let me check that for you. Your order was shipped yesterday and should arrive tomorrow.", sender: "admin", time: "2:33 PM" },
    { id: 5, text: "Great! Thank you so much for the quick response", sender: "customer", time: "2:34 PM" }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message - replace with API call later
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="container p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Customer Chats</h1>
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
              { title: "Chats" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <Card className="h-full">
            <div className="space-y-4">
              <Input.Search placeholder="Search conversations..." />
              <List
                dataSource={chats}
                renderItem={(chat) => (
                  <List.Item
                    className={`cursor-pointer p-3 rounded-lg hover:bg-gray-50 ${
                      selectedChat === chat.id ? 'bg-purple-50 border border-purple-200' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot={chat.online} color="green">
                          <Avatar src={chat.avatar} />
                        </Badge>
                      }
                      title={
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{chat.name}</span>
                          {chat.unread > 0 && (
                            <Badge count={chat.unread} size="small" />
                          )}
                        </div>
                      }
                      description={
                        <div>
                          <Text ellipsis className="text-gray-600">
                            {chat.lastMessage}
                          </Text>
                          <div className="text-xs text-gray-400 mt-1">
                            {chat.time}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>

          {/* Chat Messages */}
          <Card className="lg:col-span-2 h-full flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <Badge dot={chats.find(c => c.id === selectedChat)?.online} color="green">
                      <Avatar src={chats.find(c => c.id === selectedChat)?.avatar} />
                    </Badge>
                    <div>
                      <h3 className="font-semibold">{chats.find(c => c.id === selectedChat)?.name}</h3>
                      <Text type="secondary" className="text-sm">
                        {chats.find(c => c.id === selectedChat)?.online ? 'Online' : 'Offline'}
                      </Text>
                    </div>
                  </div>
                  <Space>
                    <Button icon={<PhoneIcon className="w-4 h-4" />} size="small" />
                    <Button icon={<VideoCameraIcon className="w-4 h-4" />} size="small" />
                  </Space>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'admin'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'admin' ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onPressEnter={handleSendMessage}
                      className="flex-1"
                    />
                    <Button
                      type="primary"
                      icon={<PaperAirplaneIcon className="w-4 h-4" />}
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chats;