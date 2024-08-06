import React, { useState, useEffect } from "react";

const CustomerInvoice = ({ onBack }) => {
  const [customerID, setCustomerID] = useState("");
  const [salesRecords, setSalesRecords] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch sales records and products (assuming you have APIs for these)
  useEffect(() => {
    if (customerID) {
      // Fetch sales records for the customer
      fetch(`/api/customers/${customerID}/sales`)
        .then((response) => response.json())
        .then((data) => setSalesRecords(data));
    }
    // Fetch all products
    fetch(`/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [customerID]);

  const handleSearch = () => {
    // Fetch sales records based on filters
    let url = `/api/customers/${customerID}/sales`;
    if (fromDate && toDate) {
      url += `?from=${fromDate}&to=${toDate}`;
    }
    if (selectedProduct) {
      url += `&product_id=${selectedProduct}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setSalesRecords(data));
  };

  const getInvoiceURL = () => {
    let url = `customer/${customerID}/invoice`;
    if (fromDate && toDate) {
      url += `/${fromDate}-${toDate}`;
    }
    if (selectedProduct) {
      url += `/product/${selectedProduct}`;
    }
    return url;
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-red-800 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Back
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="customerID" className="block text-lg mb-2">
          Search Customer:
        </label>
        <input
          type="text"
          id="customerID"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          className="p-2 border rounded"
          placeholder="Enter Customer ID"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Search
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="fromDate" className="block text-lg mb-2">
          From Date:
        </label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="toDate" className="block text-lg mb-2">
          To Date:
        </label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="product" className="block text-lg mb-2">
          Filter by Product:
        </label>
        <select
          id="product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition"
        >
          Filter Records
        </button>
      </div>
      <div className="mb-4">
        <button
          onClick={() => (window.location.href = getInvoiceURL())}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-500 transition"
        >
          Get Invoice
        </button>
      </div>
      <div>
        {salesRecords.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Product</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {salesRecords.map((record) => (
                <tr key={record.id}>
                  <td className="border px-4 py-2">{record.date}</td>
                  <td className="border px-4 py-2">{record.productName}</td>
                  <td className="border px-4 py-2">{record.quantity}</td>
                  <td className="border px-4 py-2">{record.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sales records found for the selected customer.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerInvoice;
