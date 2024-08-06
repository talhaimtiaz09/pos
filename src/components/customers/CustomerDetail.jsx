import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const CustomerDetail = ({ onBack }) => {
  const [customerID, setCustomerID] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [salesRecords, setSalesRecords] = useState([]);

  useEffect(() => {
    if (customerID) {
      // Fetch customer details
      fetch(`/api/customers/${customerID}`)
        .then((response) => response.json())
        .then((data) => setCustomerDetails(data));

      // Fetch sales records for the customer
      fetch(`/api/customers/${customerID}/sales`)
        .then((response) => response.json())
        .then((data) => setSalesRecords(data));
    }
  }, [customerID]);

  const calculateYearsOfPurchase = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    return now.getFullYear() - start.getFullYear();
  };

  const getSalesGraphData = () => {
    const dates = salesRecords.map((record) => record.date);
    const quantities = salesRecords.map((record) => record.quantity);

    return {
      labels: dates,
      datasets: [
        {
          label: "Sales Quantity",
          data: quantities,
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  };

  const handleSearch = () => {
    if (customerID) {
      // Fetch data based on customer ID
      fetch(`/api/customers/${customerID}`)
        .then((response) => response.json())
        .then((data) => {
          setCustomerDetails(data);
          fetch(`/api/customers/${customerID}/sales`)
            .then((response) => response.json())
            .then((data) => setSalesRecords(data));
        });
    }
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
          placeholder="Enter Customer ID or Name"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Search
        </button>
      </div>
      {customerDetails && (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <p>Name: {customerDetails.name}</p>
            <p>Phone: {customerDetails.phone}</p>
            <p>Email: {customerDetails.email}</p>
            <p>Address: {customerDetails.address}</p>
            <p>
              Date Added:{" "}
              {new Date(customerDetails.dateAdded).toLocaleDateString()}
            </p>
            <p>
              Years Purchasing:{" "}
              {calculateYearsOfPurchase(customerDetails.dateAdded)}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Sales Records</h2>
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
                      <td className="border px-4 py-2">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
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
          <div className="mb-4">
            <h2 className="text-xl font-bold">Sales Graph</h2>
            {salesRecords.length > 0 && <Line data={getSalesGraphData()} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
