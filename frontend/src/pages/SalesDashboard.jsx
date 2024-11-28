import React from "react";
import { Link } from "react-router-dom";

const SalesDashboard = () => {
  return (
    <div className="sales-dashboard-container bg-bkg-dark p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Sales Management</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/sales/form">
          <div className="dashboard-item bg-blue-500 hover:bg-blue-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Sales Form</h2>
          </div>
        </Link>
        <Link to="/sales/record">
          <div className="dashboard-item bg-green-500 hover:bg-green-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Sales Record</h2>
          </div>
        </Link>
        <Link to="/sales/credit">
          <div className="dashboard-item bg-yellow-500 hover:bg-yellow-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Credit Sales</h2>
          </div>
        </Link>
        <Link to="/sales/payment">
          <div className="dashboard-item bg-red-500 hover:bg-red-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Credit Payment</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SalesDashboard;
