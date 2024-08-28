import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faBox,
  faIndustry,
  faFileInvoice,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem";
import ToggleButton from "../utils/ToggleButton";

const Navbar = () => {
  // Initialize autoHide state based on local storage
  const [isOpen, setIsOpen] = useState(
    !localStorage.getItem("autoHide") || false
  );
  const [autoHide, setAutoHide] = useState(
    localStorage.getItem("autoHide") || false
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    // Store autoHide state in local storage whenever it changes
    localStorage.setItem("autoHide", autoHide);
  }, [autoHide]);

  const toggleSidebar = () => {
    // setIsSidebarVisible(!isSidebarVisible);
    console.log("autoHide", autoHide);
    if (autoHide) {
      setIsOpen(!isOpen);
      // if (!isOpen) {
      //   setTimeout(() => {
      //     setIsOpen(false);
      //     console.log("closing sidebar");
      //   }, 3000);
      // }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div
        className="absolute top-4 left-4 cursor-pointer z-30  text-white"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>

      <nav
        className={`bg-bkg-light text-txt-white flex-col flex w-64 border-r border-gray-300 py-6 shadow-lg text-lg fixed top-0 pt-16 z-20 h-screen overflow-y-scroll transition-transform duration-300 ease-in-out ${
          autoHide && !isSidebarVisible ? "-translate-x-full" : "translate-x-0"
        }  left-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-10`}
      >
        {/* Sidebar Items */}
        <SidebarItem
          title="Dashboard"
          icon={<FontAwesomeIcon icon={faTachometerAlt} />}
          links={[{ name: "Home", path: "/dashboard" }]}
        />
        <SidebarItem
          title="Sales"
          icon={<FontAwesomeIcon icon={faUsers} />}
          links={[
            { name: "Form", path: "/sales/form" },
            { name: "Credit", path: "/sales/credit" },
            { name: "Payment", path: "/sales/payment" },
            { name: "Records", path: "/sales/record" },
          ]}
        />
        <SidebarItem
          title="Customers"
          icon={<FontAwesomeIcon icon={faUsers} />}
          links={[
            { name: "Create Customer", path: "/customer/create" },
            { name: "List Customers", path: "/customer/list" },
          ]}
        />
        <SidebarItem
          title="Inventory"
          icon={<FontAwesomeIcon icon={faBox} />}
          links={[
            { name: "Add Inventory", path: "/inventory/register" },
            { name: "Locations", path: "/inventory/location" },
            { name: "Records", path: "/inventory/record" },
            { name: "Stock", path: "/inventory/stock" },
          ]}
        />
        <SidebarItem
          title="Products"
          icon={<FontAwesomeIcon icon={faIndustry} />}
          links={[
            { name: "Add Product", path: "/product/add" },
            { name: "List Products", path: "/product/list" },
            { name: "Products Category", path: "/product/category" },
            { name: "Products UOM", path: "/product/unit" },
            { name: "Batch", path: "/product/batch" },
            { name: "Batch Details", path: "/product/batch-details" },
          ]}
        />
        <SidebarItem
          title="Companies"
          icon={<FontAwesomeIcon icon={faIndustry} />}
          links={[
            { name: "Register Company", path: "/company/register" },
            { name: "List Companies", path: "/company/list" },
          ]}
        />
        <SidebarItem
          title="Stakeholder"
          icon={<FontAwesomeIcon icon={faIndustry} />}
          links={[
            { name: "Register Stakeholder", path: "/stakeholder/register" },
            { name: "Categories", path: "/stakeholder/category" },
          ]}
        />
        <SidebarItem
          title="Invoices"
          icon={<FontAwesomeIcon icon={faFileInvoice} />}
          links={[
            { name: "Create Invoice", path: "/invoice/create" },
            { name: "List Invoices", path: "/invoice/list" },
          ]}
        />
        <SidebarItem
          title="Accounts"
          icon={<FontAwesomeIcon icon={faFileInvoice} />}
          links={[
            { name: "Create Account", path: "/account/register" },
            { name: "Categories", path: "/account/category" },
            { name: "Account List", path: "/account/list" },
            { name: "Transaction", path: "/account/transactions" },
          ]}
        />

        <div className="p-4 mt-auto">
          <h1 className="text-primary font-bold ">Options</h1>
          <div className="flex justify-between items-center">
            <p>Enable Auto hide</p>
            <ToggleButton value={autoHide} onClick={setAutoHide} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
