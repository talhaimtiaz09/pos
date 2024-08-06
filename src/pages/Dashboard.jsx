import React, { useState } from "react";
import Navbar from "../components/layout/Navbar"; // Adjust the import path as necessary
import CustomersPage from "./CustomersPage";
import InventoryPage from "./InventoryPage";
import ProductsPage from "./ProductsPage";
import CompaniesPage from "./CompaniesPage";
import InvoiceGeneratorPage from "./InvoiceGeneratorPage";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("customers");
  const [currentoption, setCurrentOption] = useState("list");

  const setView = (view) => {
    setCurrentView(view);
  };
  const setOption = (opt) => {
    setCurrentOption(opt);
  };

  return (
    <div
      id="dashboard"
      className="dashboard relative min-h-screen flex bg-black-dark "
    >
      <Navbar
        selectView={setView}
        selectOption={setOption}
        currentView={currentView}
        props={props}
      />

      <div className="flex-1 flex flex-col">
        <main className="p-8">
          {currentView === "dashboard" && <div>Dashboard Content</div>}
          {currentView === "customers" && <CustomersPage props={props} />}
          {currentView === "inventory" && <InventoryPage />}
          {currentView === "products" && <ProductsPage />}
          {currentView === "companies" && <CompaniesPage />}
          {currentView === "invoiceGenerator" && <InvoiceGeneratorPage />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
