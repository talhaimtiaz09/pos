import React, { useState } from "react";

const ProductRegisterForm = () => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("fertilizer");
  const [unit, setUnit] = useState("bag");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, such as sending data to an API
    console.log({
      productName,
      productType,
      unit,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-lg mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productType" className="block text-lg mb-2">
            Product Type
          </label>
          <select
            id="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="fertilizer">Fertilizer</option>
            <option value="pesticide">Pesticide</option>
            <option value="supplement">Supplement</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="unit" className="block text-lg mb-2">
            Unit
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="bag">Bag</option>
            <option value="kg">Kg</option>
            <option value="grams">Grams</option>
            <option value="packet">Packet</option>
            <option value="bottles">Bottles</option>
            <option value="liters">Liters</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductRegisterForm;
