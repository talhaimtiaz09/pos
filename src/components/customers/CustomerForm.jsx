import React, { useState } from "react";

const CustomerForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <button>Back</button>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Customer
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700"
        >
          Add Customer
        </button>
      </form>
    </>
  );
};

export default CustomerForm;
