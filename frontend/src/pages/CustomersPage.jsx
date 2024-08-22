import React, { useState } from "react";
import CustomerCreateForm from "../components/customers/CustomerCreateForm";
import CustomerList from "../components/customers/CustomerList"; // Assuming you have an List component
import CustomerInvoice from "../components/customers/CustomerInvoice"; // Assuming you have an Invoices component
import CustomerDetail from "../components/customers/CustomerDetail"; // Assuming you have a CustomerDetail component

const CustomersPage = () => {
  const [view, setView] = useState("List"); // null means default view

  const headerStyles =
    "rounded-lg p-6 bg-white bg-opacity-80 pr-12 shadow-md text-gray-900";

  const handleBack = () => {
    setView(null);
  };

  const renderContent = () => {
    switch (view) {
      case "List":
        return <CustomerList onBack={handleBack} />;
      case "newCustomer":
        return (
          <CustomerCreateForm
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
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold">Select an Option Above</h2>
          </div>
        );
    }
  };

  const getTabClass = (tab) =>
    `p-4 cursor-pointer ${
      view === tab ? "bg-primary text-txt-white" : " text-gray-200"
    } border-b-2 flex items-center justify-between hover:bg-primary-hover transition`;

  return (
    <div className="min-h-screen text-txt-white">
      <div className="flex w-full ">
        <div className="flex flex-col justify-center gap-x-4 w-80">
          <div
            className={getTabClass("invoices")}
            onClick={() => setView("invoices")}
          >
            <p className="text-lg">Get Invoice</p>
          </div>
          <div
            className={getTabClass("newCustomer")}
            onClick={() => setView("newCustomer")}
          >
            <p className="text-lg">Add New Customer</p>
          </div>
          <div className={getTabClass("List")} onClick={() => setView("List")}>
            <p className="text-lg">View All Customers</p>
          </div>
          <div
            className={getTabClass("customerDetail")}
            onClick={() => setView("customerDetail")}
          >
            <p className="text-lg">Get Customer Detail</p>
          </div>
        </div>
        <div id="renderDiv" className="w-full p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
