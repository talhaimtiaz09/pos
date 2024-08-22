// SidebarItem.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const SidebarItem = ({ title, icon, links }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between w-full px-4 py-2 my-2 text-left ${
          isExpanded ? "bg-primary text-txt-white" : "hover:bg-bkg-dark"
        } transition duration-300`}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-4">{title}</span>
        </div>
        <FontAwesomeIcon icon={isExpanded ? faCaretDown : faCaretRight} />
      </button>
      {isExpanded && (
        <div className="pl-6 bg-bkg-dark">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-2 px-4 hover:text-primary transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
