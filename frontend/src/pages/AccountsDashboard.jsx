import React from "react";
import { Link } from "react-router-dom";

const AccountsDashboard = () => {
  return (
    <div className="accounts-dashboard-container bg-bkg-dark p-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Accounts Management
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/account/register">
          <div className="dashboard-item bg-blue-500 hover:bg-blue-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Register Account</h2>
          </div>
        </Link>
        <Link to="/account/list">
          <div className="dashboard-item bg-green-500 hover:bg-green-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Account List</h2>
          </div>
        </Link>
        <Link to="/account/category">
          <div className="dashboard-item bg-yellow-500 hover:bg-yellow-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Account Categories</h2>
          </div>
        </Link>
        <Link to="/account/transactions">
          <div className="dashboard-item bg-red-500 hover:bg-red-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Transactions</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AccountsDashboard;
