import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const topBoxStyle =
  "p-12 bg-white rounded-lg shadow-lg w-60 flex flex-col items-center justify-center hover:translate-y-1  transition duration-300 cursor-pointer";

const SmallBox = (props) => {
  const { icon, text, onClick } = props;
  return (
    <div className={topBoxStyle} onClick={onClick}>
      <FontAwesomeIcon className="text-black text-4xl" icon={icon} />
      <p className="text-center mt-4 text-lg">{text}</p>
    </div>
  );
};

export default SmallBox;
