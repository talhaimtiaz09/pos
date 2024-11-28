import React from "react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  return (
    <div className="customer-dashboard-container bg-bkg-dark p-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Customer Management
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/customer/create">
          <div className="dashboard-item bg-blue-500 hover:bg-blue-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Create Customer</h2>
          </div>
        </Link>
        <Link to="/customer/analytics">
          <div className="dashboard-item bg-green-500 hover:bg-green-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Customer Analytics</h2>
          </div>
        </Link>
        <Link to="/customer/invoices">
          <div className="dashboard-item bg-yellow-500 hover:bg-yellow-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Customer Invoices</h2>
          </div>
        </Link>
        <Link to="/customer/list">
          <div className="dashboard-item bg-red-500 hover:bg-red-700 text-white text-center p-6 rounded shadow-lg">
            x <h2 className="text-2xl font-semibold">Customer List</h2>
          </div>
        </Link>
      </div>
    </div>
  );
  cx;
};

export default CustomerDashboard;
