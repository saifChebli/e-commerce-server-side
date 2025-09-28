import { Avatar, Pagination, Rate, Tag } from "antd";
import React, { useState } from "react";

const ProductsTable = ({ data, pageSize = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  // Stock badge
  const getStockBadge = (qty) => {
    if (qty === 0) {
      return <Tag color="red">Out of Stock</Tag>;
    } else if (qty < 20) {
      return <Tag color="orange">Low Stock</Tag>;
    }
    return <Tag color="green">In Stock</Tag>;
  };

  return (
    <div className="my-8">
      {/* Table */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-50 border-y border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentData.map((product) => (
            <tr className="hover:bg-gray-50" key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-4 text-sm">
                  <Avatar
                    shape="square"
                    size={48}
                    src={product.photo}
                    alt={product.name}
                  />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-500 text-xs">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-sm">{product.price}</td>
              <td className="text-sm">{product.qty}</td>
              <td>{getStockBadge(product.qty)}</td>
              <td>
                <Rate disabled defaultValue={product.rating} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end p-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
