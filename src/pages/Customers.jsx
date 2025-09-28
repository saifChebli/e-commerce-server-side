import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import React from 'react'
import CustomersTable from '../components/Table/CustomersTable'

const Customers = () => {
  return (
    <div  className="container p-6">
        <div className="space-y-6">

      <h1 className="text-2xl font-semibold ">Customers</h1>
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
            title: "Customers",
          },
        ]}
      />
      </div>
      <CustomersTable />
    </div>
  )
}

export default Customers