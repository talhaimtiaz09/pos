import React from "react";
import { Link } from "react-router-dom";

const ProductsDashboard = () => {
  return (
    <div className="products-dashboard-container bg-bkg-dark p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Product Management</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/product/add">
          <div className="dashboard-item bg-blue-500 hover:bg-blue-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Add Product</h2>
          </div>
        </Link>
        <Link to="/product/list">
          <div className="dashboard-item bg-green-500 hover:bg-green-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Product List</h2>
          </div>
        </Link>
        <Link to="/product/category">
          <div className="dashboard-item bg-yellow-500 hover:bg-yellow-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Product Categories</h2>
          </div>
        </Link>
        <Link to="/product/unit">
          <div className="dashboard-item bg-red-500 hover:bg-red-700 text-white text-center p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold">Product Units</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductsDashboard;
