import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Badge, Dropdown, Avatar, Button, Space } from "antd";
import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
  PowerIcon ,
} from "@heroicons/react/24/solid";
import { DownOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const Header = ({ toggleSidebar = () => {} }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notificationMenu = [
    {
      label: (
        <Link to="/chats">
          <Space>
            Messages <Badge count={13} size="small" />
          </Space>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="/orders">
          <Space>
            Sales <Badge count={3} size="small" />
          </Space>
        </Link>
      ),
      key: "1",
    },
  ];

  const profileMenu = [
    {
      label: (
        <Link to="/manage-profile">
          <Space>Profile</Space>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="/settings">
          <Space>Settings</Space>
        </Link>
      ),
      key: "1",
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Button type="text" onClick={handleLogout} className="w-full text-left">
          <Space>
            <PowerIcon className="w-4 h-4" />
            Logout
          </Space>
        </Button>
      ),
      key: "2",
    },
  ];

  return (
    <header className="z-40 py-4 bg-white shadow dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        {/* Mobile hamburger */}
        <Button
          type="text"
          icon={<Bars3Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
          className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleSidebar}
        />

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <Button
            type="text"
            icon={
              
                <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
              
            }
           
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          />

          {/* Notifications */}
          <Dropdown menu={{ items: notificationMenu }} trigger={["click"]}>
            <Button 
              type="text" 
              icon={<BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />} 
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            />
          </Dropdown>

          {/* Profile */}
          <Dropdown menu={{ items: profileMenu }} trigger={["click"]}>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors">
              <Avatar 
                src={user?.avatar} 
                icon={<UserIcon className="w-5 h-5" />}
                className="bg-purple-100 dark:bg-purple-900"
              />
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name || 'Admin'}
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
