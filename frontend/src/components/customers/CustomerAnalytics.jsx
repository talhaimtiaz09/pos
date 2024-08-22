import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const CustomerAnalytics = ({ onBack }) => {
  const [timeDuration, setTimeDuration] = useState("monthly");
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Fetch analytics data based on the selected time duration
    fetch(`/api/customers/analytics?duration=${timeDuration}`)
      .then((response) => response.json())
      .then((data) => setAnalyticsData(data));
  }, [timeDuration]);

  const getSalesGraphData = () => {
    const dates = analyticsData.map((record) => record.date);
    const sales = analyticsData.map((record) => record.totalSales);

    return {
      labels: dates,
      datasets: [
        {
          label: "Total Sales",
          data: sales,
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-red-800 text-txt-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Back
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="timeDuration" className="block text-lg mb-2">
          Select Time Duration:
        </label>
        <select
          id="timeDuration"
          value={timeDuration}
          onChange={(e) => setTimeDuration(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {analyticsData && (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Sales Analytics</h2>
            <p>Total Sales: Rs.{analyticsData.totalSales}</p>
            <p>Average Sales Per Order: Rs.{analyticsData.avgSalesPerOrder}</p>
            <p>Total Orders: {analyticsData.totalOrders}</p>
            <p>Highest Sale: Rs.{analyticsData.highestSale}</p>
            <p>Lowest Sale: Rs.{analyticsData.lowestSale}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Sales Graph</h2>
            {analyticsData.length > 0 && <Line data={getSalesGraphData()} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAnalytics;
