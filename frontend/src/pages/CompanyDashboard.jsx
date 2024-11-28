import React from "react";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  return (
    <div className="company-dashboard-container bg-bkg-dark p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Company Management</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/company/register">
          <div className="dashboard-item bg-blue-500 hover:bg-blue-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Register Company</h2>
          </div>
        </Link>
        <Link to="/company/list">
          <div className="dashboard-item bg-green-500 hover:bg-green-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Company List</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CompanyDashboard;
