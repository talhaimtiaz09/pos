import React, { useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function
import StatusMessage from "../popups/StatusMessage"; // Adjust the import path as necessary

const CustomerCreateForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = { name, address, phone };

    try {
      const responseData = await fetchData(
        "/customer/new",
        "POST",
        customerData
      );
      setResponse(responseData);
      console.log("New customer created:", responseData.data);
      setStatus(responseData.message);

      setName("");
      setAddress("");
      setPhone("");
    } catch (error) {
      setResponse(null);
      setStatus(error.response?.data?.message || "Error creating customer");
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className="flex w-2/3 gap-x-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black-light p-8 rounded-lg a shadow-lg my-10 w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">Add New Customer</h2>
        <div className="mb-4">
          <label className="block text-gray-200 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-transparent border-1 border-slate-100 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-200 font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-transparent border-1 border-slate-100 text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-transparent border-1 border-slate-100 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-10 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700"
        >
          Add Customer
        </button>
        {status && <StatusMessage response={response} status={status} />}
      </form>
    </div>
  );
};

export default CustomerCreateForm;
