import { Avatar, Badge, Pagination } from "antd";
import React from "react";

const CustomersTable = () => {
  const data = [
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@doe",
      joined: "Dec 12, 2020",
    },
    {
      firstName: "Timothy",
      lastName: "Doe",
      email: "timothy@doe",
      joined: "Dec 12, 2020",
    },
  ];


 const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { color: "bg-blue-100 text-blue-700", label: "Paid" },
      unpaid: { color: "bg-orange-100 text-orange-700", label: "Unpaid" },
      completed: { color: "bg-green-100 text-green-700", label: "Completed" },
    };

    const config = statusConfig[status] || statusConfig.paid;
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div>
      {/* Table */}
      <div className="my-8">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50 border-y border-gray-200 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y   divide-gray-200">
            {data.map((user, i) => (
              <tr className="hover:bg-gray-50" key={i}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-6 text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold">{user.firstName}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-sm">{user.lastName}</span>
                </td>
                <td>
                  <span className="text-sm"> {user.email}</span>
                </td>
                <td>
                  <span className="text-sm">
                    {new Date(user.joined).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end p-4">
          <Pagination showQuickJumper defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
