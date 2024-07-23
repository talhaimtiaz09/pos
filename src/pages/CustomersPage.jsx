import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  // faFileInvoice,
  // faUsers,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import SmallBox from "../components/dasboard/SmallBox";
import CustomerForm from "../components/customers/CustomerForm";
import CustomerAnalytics from "../components/customers/CustomerAnalytics"; // Assuming you have an Analytics component
import CustomerInvoice from "../components/customers/CustomerInvoice"; // Assuming you have an Invoices component
import CustomerDetail from "../components/customers/CustomerDetail"; // Assuming you have a CustomerDetail component

const CustomersPage = () => {
  const [view, setView] = useState(null); // null means default view

  const headerStyles =
    "rounded-lg p-6 bg-white bg-opacity-80 pr-12 shadow-md text-gray-900";

  const handleBack = () => {
    setView(null);
  };

  const renderContent = () => {
    switch (view) {
      case "analytics":
        return <CustomerAnalytics onBack={handleBack} />;
      case "newCustomer":
        return (
          <CustomerForm
            onSubmit={(customer) => console.log(customer)}
            onBack={handleBack}
          />
        );
      case "invoices":
        return <CustomerInvoice onBack={handleBack} />;
      case "customerDetail":
        return <CustomerDetail onBack={handleBack} />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="p-6 bg-blue-600 rounded-lg shadow-md flex items-center justify-between hover:bg-blue-500 transition cursor-pointer"
                onClick={() => setView("invoices")}
              >
                <p className="text-xl">Get Invoice</p>
                {/* <FontAwesomeIcon icon={faFileInvoice} className="text-2xl" /> */}
              </div>
              <div
                className="p-6 bg-green-600 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-green-500 transition"
                onClick={() => setView("newCustomer")}
              >
                <p className="text-xl">Add New Customer</p>
                <FontAwesomeIcon icon={faSquarePlus} className="text-2xl" />
              </div>
              <div
                className="p-6 bg-yellow-600 rounded-lg shadow-md flex items-center justify-between hover:bg-yellow-500 transition cursor-pointer"
                onClick={() => setView("analytics")}
              >
                <p className="text-xl">View All Customers</p>
                {/* <FontAwesomeIcon icon={faUsers} className="text-2xl" /> */}
              </div>
              <div
                className="p-6 bg-red-600 rounded-lg shadow-md flex items-center justify-between hover:bg-red-500 transition cursor-pointer"
                onClick={() => setView("customerDetail")}
              >
                <p className="text-xl">Get Customer Detail</p>
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen  text-white">
      <nav className="flex justify-between items-center p-6 bg-white shadow-md bg-opacity-50 rounded-lg">
        <div className="font-bold">
          <h1 className="text-3xl tracking-wider text-white">
            Customer <span className="block">Information</span>
          </h1>
        </div>
        {view === null && (
          <div className="flex gap-x-4">
            <div className={headerStyles}>
              <p className="text-lg">Total Customers</p>
              <p className="text-4xl font-bold">200</p>
            </div>
            <div className={headerStyles}>
              <p className="text-lg">Customers Gained This Month</p>
              <p className="text-4xl font-bold">5</p>
            </div>
            <div className={headerStyles}>
              <p className="text-lg">Avg Order Value</p>
              <p className="text-4xl font-bold">Rs.2359</p>
            </div>
          </div>
        )}
      </nav>
      <div className="p-6">{renderContent()}</div>
    </div>
  );
};

export default CustomersPage;
