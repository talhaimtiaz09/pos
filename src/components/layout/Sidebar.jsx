import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = (props) => {
  const liStyle =
    "text-white text-lg p-2 hover:bg-lime-600  my-2 px-10 cursor-pointer";
  return (
    <aside className="w-full h-full py-10">
      <nav>
        <div
          className="pl-2 pr-10 py-4 -mt-10 bg-black text-white hover:bg-white hover:text-black transition flex gap-x-4 text-lg items-center"
          onClick={() => props.setShowSidebar(false)}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            className="text-lg ml-auto"
          />
        </div>
        <ul>
          <FontAwesomeIcon icon="" />
          <FontAwesomeIcon icon="fa-solid fa-building" />
          <FontAwesomeIcon icon="fa-solid fa-warehouse" />
          <FontAwesomeIcon icon="fa-solid fa-cubes" />
          <FontAwesomeIcon icon="fa-solid fa-user" />
          <FontAwesomeIcon icon="fa-solid fa-chart-line" />
          <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
          <li className={liStyle} onClick={() => props.selectView("dashboard")}>
            Dashboard
          </li>
          <li className={liStyle} onClick={() => props.selectView("customers")}>
            Customers
          </li>
          <li className={liStyle} onClick={() => props.selectView("inventory")}>
            Inventory
          </li>
          <li className={liStyle} onClick={() => props.selectView("products")}>
            Products
          </li>
          <li className={liStyle} onClick={() => props.selectView("companies")}>
            Companies
          </li>
          <li
            className={liStyle}
            onClick={() => props.selectView("invoiceGenerator")}
          >
            Generate Invoice
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
