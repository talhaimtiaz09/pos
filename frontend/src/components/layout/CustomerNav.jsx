import React from "react";

const CustomerNav = ({ selectOption }) => {
  const [view, setView] = React.useState(null);
  const getTabClass = (tab) => {
    return `p-4 cursor-pointer ${
      view === tab ? "bg-primary text-white" : " text-gray-200"
    } border-b-2 flex items-center justify-between hover:bg-blue-600 transition`;
  };
  return (
    <div>
      <div className="flex flex-col justify-center gap-x-4 w-80">
        <div
          className={getTabClass("invoices")}
          onClick={() => selectOption("invoices")}
        >
          <p className="text-lg">Get Invoice</p>
        </div>
        <div
          className={getTabClass("newCustomer")}
          onClick={() => selectOption("newCustomer")}
        >
          <p className="text-lg">Add New Customer</p>
        </div>
        <div
          className={getTabClass("List")}
          onClick={() => selectOption("List")}
        >
          <p className="text-lg">View All Customers</p>
        </div>
        <div
          className={getTabClass("customerDetail")}
          onClick={() => selectOption("customerDetail")}
        >
          <p className="text-lg">Get Customer Detail</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerNav;
