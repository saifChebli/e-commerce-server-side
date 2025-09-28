import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import OrdersTable from "../components/Table/OrdersTable";

const Orders = () => {
  return (
    <div className="container p-6">
      <div className="space-y-6">

      <h1 className="text-2xl font-semibold ">Orders</h1>
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

          {
            title: "Orders",
          },
        ]}
      />
      </div>
        <OrdersTable showActions={true} />
    </div>
  );
};

export default Orders;
