import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SmallBox from "../components/dasboard/SmallBox";
import CustomerForm from "../components/customers/CustomerForm";
const CustomersPage = () => {
  return (
    <>
      <div className="w-full p-10 rounded-lg">
        <SmallBox
          icon={"fa-regular fa-square-plus" as IconProp}
          onClick={() => console.log("clicked")}
          text="Add new customer"
        />
      </div>

      <CustomerForm onSubmit={() => {}} />
    </>
  );
};

export default CustomersPage;
