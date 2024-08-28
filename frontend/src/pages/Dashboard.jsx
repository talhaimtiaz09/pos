import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Sales Overview
          </h2>
          <p className="text-gray-500">View sales data, reports, and more...</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Customer Management
          </h2>
          <p className="text-gray-500">
            Manage customer details, add new customers...
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Inventory Status
          </h2>
          <p className="text-gray-500">
            Check current stock, update inventory...
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Product Listings
          </h2>
          <p className="text-gray-500">
            Browse products, categories, and more...
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Company Records
          </h2>
          <p className="text-gray-500">
            Manage company information and stakeholders...
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Accounts and Invoices
          </h2>
          <p className="text-gray-500">
            Create invoices, manage transactions, and more...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
