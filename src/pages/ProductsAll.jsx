import { HomeOutlined, BarsOutlined } from "@ant-design/icons";
import {
  Bars3Icon,
  Squares2X2Icon,
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Breadcrumb, Button, Card, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductsTable from "../components/Table/ProductsTable";

const ProductsAll = () => {
  const [view, setView] = useState("grid");

  const handleChangeView = () => {
    setView(view === "list" ? "grid" : "list");
  };

  const data = [
    {
      id: 1,
      photo: "https://vetra.laborasyon.com/assets/images/products/1.jpg",
      name: "Headphone",
      shortDescription:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      price: "$120.00",
      qty: 120,
      rating: 5.0,
    },
    {
      id: 2,
      photo: "https://vetra.laborasyon.com/assets/images/products/2.jpg",
      name: "Shoe",
      shortDescription:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      price: "$320.00",
      qty: 54,
      rating: 5,
    },
    {
      id: 3,
      photo: "https://vetra.laborasyon.com/assets/images/products/3.jpg",
      name: "Digital Clock",
      shortDescription:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      price: "$230.00",
      qty: 0,
      rating: 3,
    },
    {
      id: 4,
      photo: "https://vetra.laborasyon.com/assets/images/products/4.jpg",
      name: "Toy Car",
      shortDescription:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      price: "$54.00",
      qty: 12,
      rating: 4,
    },
  ];

  return (
    <div className="container p-6">
      <div className="flex justify-between">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Products</h1>
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
            ]}
          />
        </div>
        <div>
          <Button
            className="p-2"
            aria-label="Toggle view"
            style={{ backgroundColor: "#6C2BD9" }}
            type="primary"
            onClick={handleChangeView}
          >
            {view === "list" ? (
              <Squares2X2Icon className="h-5 w-5 text-white" />
            ) : (
              <Bars3Icon className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
      </div>

      <div className="my-6">
        {view === "grid" ? (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
            {data.map((product) => (
              <Card
                key={product.id}
                cover={
                  <img
                    alt={product.name}
                    src={product.photo}
                    className="object-cover h-48 w-full"
                  />
                }
                actions={[
                  <Link to={`/product/${product.id}`} key="view">
                    <Button
                      icon={<EyeIcon className="h-4 w-4" />}
                      size="small"
                    />
                  </Link>,
                  <Button
                    key="edit"
                    icon={<PencilSquareIcon className="h-4 w-4" />}
                    size="small"
                  />,
                  <Button
                    key="delete"
                    icon={<TrashIcon className="h-4 w-4" />}
                    danger
                    size="small"
                  />,
                ]}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold truncate text-gray-700">
                    {product.name}
                  </p>
                  <Tag color={product.qty > 0 ? "green" : "red"}>
                    {product.qty > 0 ? "In Stock" : "Out of Stock"}
                  </Tag>
                </div>
                <p className="text-purple-500 font-bold text-lg mb-2">
                  {product.price}
                </p>
                <p className="text-gray-600">{product.shortDescription}</p>
              </Card>
            ))}
          </div>
        ) : (
          <ProductsTable data={data} />
        )}
      </div>
    </div>
  );
};

export default ProductsAll;
