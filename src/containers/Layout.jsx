import React, { Suspense, useEffect, lazy } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300`}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container grid px-6 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
