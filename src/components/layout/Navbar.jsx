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

const Navbar = () => {
  return (
    <nav className="bg-white text-slate-800 flex-col flex w-64 rounded-lg border border-gray-300 py-6 shadow-lg text-lg">
      <SidebarItem
        title="Dashboard"
        icon={<FontAwesomeIcon icon={faTachometerAlt} />}
        links={[{ name: "Home", path: "/dashboard" }]}
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
          { name: "Add Inventory", path: "/inventory/add" },
          { name: "List Inventory", path: "/inventory/list" },
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
        title="Invoices"
        icon={<FontAwesomeIcon icon={faFileInvoice} />}
        links={[
          { name: "Create Invoice", path: "/invoice/create" },
          { name: "List Invoices", path: "/invoice/list" },
        ]}
      />
    </nav>
  );
};

export default Navbar;
