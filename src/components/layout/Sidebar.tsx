import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const liStyle: string =
    "text-white text-lg p-2 hover:bg-gray-700 rounded-lg my-2";
  return (
    <aside className="bg-black w-1/5 h-screen bg-opacity-80 -ml-10 -mt-16 p-10">
      <nav>
        <ul>
          <li className={`${liStyle}`}>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
