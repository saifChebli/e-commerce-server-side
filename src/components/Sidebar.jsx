import React, { useState } from "react";
import { routes } from "../routes/sidebar";
import { Button, Divider } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Boutique 2V Technologies.webp";

const Sidebar = () => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:block">
      <div className="py-4 flex flex-col items-start text-gray-500 dark:text-gray-400">
        <img
          src={logo}
          className="w-14 h-14 object-cover mx-auto rounded-lg"
          alt="boutique 2v technologies logo"
        />
        <ul className="mt-6">
          {routes.slice(0, -3).map((route, index) =>
            route.routes ? (
              <li className="relative px-6 py-3" key={index}>
                <button
                  onClick={handleDropdownMenuClick}
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2"
                >
                  <span className="inline-flex items-center">
                    <span className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-300">{route.icon}</span>{" "}
                    <span className="ml-4">{route.name}</span>
                  </span>
                  <ChevronDownIcon className="w-4 h-4 ml-auto text-gray-400" />
                </button>
                {isDropdownMenuOpen && (
                  <ul
                    className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                    aria-label="submenu"
                  >
                    {route.routes.map((subRoute, index) => (
                      <li
                        className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        key={index}
                      >
                        <NavLink className="w-full flex items-center" to={subRoute.path}>
                          <span className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-300">{subRoute.icon}</span>{" "}
                          <span className="ml-4">{subRoute.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li className="relative px-6 py-3" key={index}>
                <NavLink
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2"
                  to={route.path}
                  activeClassName="text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                >
                  <span className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-300">{route.icon}</span>{" "}
                  <span className="ml-4">{route.name}</span>
                </NavLink>
              </li>
            )
          )}

          <Divider className="border-gray-200 dark:border-gray-700" />

          {routes.slice(-3).map((route, index) => (
            <li className="relative px-6 py-3" key={index}>
              {route.path === '/logout' ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center w-full text-sm font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2"
                >
                  <span className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-300">{route.icon}</span>{" "}
                  <span className="ml-4">{route.name}</span>
                </button>
              ) : (
                <Link
                  className="inline-flex items-center w-full text-sm font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2"
                  to={route.path}
                >
                  <span className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-300">{route.icon}</span>{" "}
                  <span className="ml-4">{route.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="px-6 my-6">
          <Button 
            style={{ backgroundColor: "#6C2BD9" }} 
            type="primary"
            className="w-full hover:bg-purple-700 dark:hover:bg-purple-600"
          >
            Generate Report
            <span className="ml-2" aria-hidden="true">
              +
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
