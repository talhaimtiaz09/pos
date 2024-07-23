import React, { useState, useEffect, useRef } from "react";
import SmallBox from "../components/dasboard/SmallBox";
import Sidebar from "../components/layout/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CustomersPage from "./CustomersPage";
import InventoryPage from "./InventoryPage";
import ProductsPage from "./ProductsPage";
import CompaniesPage from "./CompaniesPage";
import InvoiceGeneratorPage from "./InvoiceGeneratorPage";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentView, setCurrentView] = useState("customers");
  const sidebarRef = useRef(null);

  const setView = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div
      id="dashboard"
      className="dashboard relative min-h-screen flex bg-gradient-to-b from-sky-200 to-indigo-100 "
    >
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-black w-64  z-20`}
      >
        <Sidebar selectView={setView} setShowSidebar={setShowSidebar} />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <FontAwesomeIcon
            icon={faBars}
            className="text-lg cursor-pointer"
            onClick={() => setShowSidebar(!showSidebar)}
          />
          <h1 className="text-xl font-bold">Dashboard</h1>
        </header>
        <main className="p-8">
          {currentView === "dashboard" && <div>Dashboard Content</div>}
          {currentView === "customers" && <CustomersPage />}
          {currentView === "inventory" && <InventoryPage />}
          {currentView === "products" && <ProductsPage />}
          {currentView === "companies" && <CompaniesPage />}
          {currentView === "invoiceGenerator" && <InvoiceGeneratorPage />}
          {/* {false && <div>Dashboard Content</div>} */}
          {/* <InvoiceGeneratorPage /> */}
          {/* <CustomersPage />
          <CompaniesPage />
          <InventoryPage />
          <ProductsPage /> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
