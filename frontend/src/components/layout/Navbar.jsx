// Navbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faBox,
  faIndustry,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem";
import { faInstalod } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  return (
    <nav className="bg-bkg-light text-txt-white flex-col flex w-64 border-r border-gray-300 py-6 shadow-lg text-lg fixed top-0 z-20 h-screen overflow-y-scroll">
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
        ]}
      />
    </nav>
  );
};

export default Navbar;
