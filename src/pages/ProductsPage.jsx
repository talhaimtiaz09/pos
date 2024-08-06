import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faListAlt,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SmallBox from "../components/dasboard/SmallBox";
import ProductForm from "../components/products/ProductRegisterForm";

const ProductsPage = () => {
  const headerStyles =
    "rounded-lg p-6 bg-white bg-opacity-80 pr-12 shadow-md text-gray-900";

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <nav className="flex justify-between items-center p-6 bg-gray-900 bg-opacity-90">
        <div className="font-bold">
          <h1 className="text-3xl tracking-wider text-white">
            Products <span className="block">Management</span>
          </h1>
        </div>
        <div className="flex gap-x-4">
          <div className={headerStyles}>
            <p className="text-lg">Total Products</p>
            <p className="text-4xl font-bold">300</p>
          </div>
          <div className={headerStyles}>
            <p className="text-lg">Products Added This Month</p>
            <p className="text-4xl font-bold">30</p>
          </div>
          <div className={headerStyles}>
            <p className="text-lg">Popular Product</p>
            <p className="text-2xl font-bold">Fertilizer A</p>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-blue-600 rounded-lg shadow-md flex items-center justify-between hover:bg-blue-500 transition">
            <p className="text-xl">Add New Product</p>
            <FontAwesomeIcon icon={faPlusSquare} className="text-2xl" />
          </div>
          <div className="p-6 bg-green-600 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-green-500 transition">
            <p className="text-xl">View All Products</p>
            <FontAwesomeIcon icon={faListAlt} className="text-2xl" />
          </div>
          <div className="p-6 bg-yellow-600 rounded-lg shadow-md flex items-center justify-between hover:bg-yellow-500 transition">
            <p className="text-xl">Stock Details</p>
            <FontAwesomeIcon icon={faShoppingBasket} className="text-2xl" />
          </div>
          {/* Add more options as needed */}
        </div>

        <div className="mt-10">
          <ProductForm onSubmit={(product) => console.log(product)} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
