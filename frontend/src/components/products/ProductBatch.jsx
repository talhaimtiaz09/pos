import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ProductBatchDetails from "./ProductBatchDetails";

const ProductBatch = () => {
  const [batchDetails, setBatchDetails] = useState([]);
  const [productBatches, setProductBatches] = useState([]);
  const [products, setProducts] = useState([]);
  // const [locations, setLocations] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBatchDetails, setSelectedBatchDetails] = useState(null);
  const [newBatch, setNewBatch] = useState({
    quantity: "",
    purchase_price: "",
    is_active: true,
    product_id: "",
    // location_id: "",
    inventory_id: "",
  });
  const [editingBatch, setEditingBatch] = useState(null);
  const [error, setError] = useState(null);
  const [showTrash, setShowTrash] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  useEffect(() => {
    const getProductBatches = async () => {
      try {
        const response = await fetchData("/inventory/batch", "GET");
        setProductBatches(response.data);
      } catch (err) {
        setError("Failed to fetch product batches.");
      }
    };

    const getBatchDetails = async () => {
      try {
        const response = await fetchData("inventory/batch-detail", "GET");
        setBatchDetails(response.data);
      } catch (err) {
        setError("Failed to fetch batch details.");
      }
    };

    const getProducts = async () => {
      try {
        const response = await fetchData("/product", "GET");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
      }
    };

    // const getLocations = async () => {
    //   try {
    //     const response = await fetchData("/inventory/location", "GET");
    //     setLocations(response.data);
    //   } catch (err) {
    //     setError("Failed to fetch locations.");
    //   }
    // };

    const getInventories = async () => {
      try {
        const response = await fetchData("/inventory", "GET");
        setInventories(response.data);
      } catch (err) {
        setError("Failed to fetch inventories.");
      }
    };

    const getCategories = async () => {
      try {
        const response = await fetchData("product/category", "GET");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };

    getBatchDetails();
    getProductBatches();
    getProducts();
    // getLocations();
    getInventories();
    getCategories();
  }, []);

  const handleCreateBatch = async () => {
    try {
      const response = await fetchData("/inventory/batch", "POST", newBatch);
      setProductBatches([...productBatches, response.data]);
      setNewBatch({
        quantity: "",
        purchase_price: "",
        is_active: true,
        product_id: "",
        // location_id: "",
        inventory_id: "",
      });
    } catch (err) {
      setError("Failed to create product batch.");
    }
  };

  const handleUpdateBatch = async () => {
    try {
      await fetchData(
        `/inventory/batch/${editingBatch.id}`,
        "PUT",
        editingBatch
      );
      setProductBatches(
        productBatches.map((batch) =>
          batch.id === editingBatch.id ? editingBatch : batch
        )
      );
      setEditingBatch(null);
    } catch (err) {
      setError("Failed to update product batch.");
    }
  };

  const handleDeleteBatch = async (id) => {
    try {
      await fetchData(`/inventory/batch/${id}`, "DELETE");
      setProductBatches(productBatches.filter((batch) => batch.id !== id));
    } catch (err) {
      setError("Failed to delete product batch.");
    }
  };

  const toggleBatchDetails = (batchId) => {
    if (selectedBatchDetails === batchId) {
      setSelectedBatchDetails(null);
    } else {
      setSelectedBatchDetails(batchId);
    }
  };

  const filteredBatches = productBatches.filter(
    (batch) =>
      (selectedProduct ? batch.product_id === selectedProduct : true) &&
      (selectedCategory
        ? products.find((p) => p.id === batch.product_id)?.category_id ===
          selectedCategory
        : true) &&
      (showActiveOnly ? batch.is_active : true)
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Product Batches</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Filters */}
      <div className="mb-4 flex gap-4 items-center">
        <select
          className="border p-2 rounded-md flex-1"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded-md flex-1"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            showActiveOnly ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setShowActiveOnly(!showActiveOnly)}
        >
          {showActiveOnly ? "Show All Batches" : "Show Active Only"}
        </button>
      </div>

      {/* Form to add or edit a batch */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 rounded-md flex-1"
          value={editingBatch ? editingBatch.quantity : newBatch.quantity}
          onChange={(e) =>
            editingBatch
              ? setEditingBatch({ ...editingBatch, quantity: e.target.value })
              : setNewBatch({ ...newBatch, quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Purchase Price"
          className="border p-2 rounded-md flex-1"
          value={
            editingBatch ? editingBatch.purchase_price : newBatch.purchase_price
          }
          onChange={(e) =>
            editingBatch
              ? setEditingBatch({
                  ...editingBatch,
                  purchase_price: e.target.value,
                })
              : setNewBatch({ ...newBatch, purchase_price: e.target.value })
          }
        />
        <select
          className="border p-2 rounded-md flex-1"
          value={editingBatch ? editingBatch.product_id : newBatch.product_id}
          onChange={(e) =>
            editingBatch
              ? setEditingBatch({ ...editingBatch, product_id: e.target.value })
              : setNewBatch({ ...newBatch, product_id: e.target.value })
          }
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        {/* <select
          className="border p-2 rounded-md flex-1"
          value={editingBatch ? editingBatch.location_id : newBatch.location_id}
          onChange={(e) =>
            editingBatch
              ? setEditingBatch({
                  ...editingBatch,
                  location_id: e.target.value,
                })
              : setNewBatch({ ...newBatch, location_id: e.target.value })
          }
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select> */}
        <select
          className="border p-2 rounded-md flex-1"
          value={
            editingBatch ? editingBatch.inventory_id : newBatch.inventory_id
          }
          onChange={(e) =>
            editingBatch
              ? setEditingBatch({
                  ...editingBatch,
                  inventory_id: e.target.value,
                })
              : setNewBatch({ ...newBatch, inventory_id: e.target.value })
          }
        >
          <option value="">Select Inventory</option>
          {inventories.map((inventory) => (
            <option key={inventory.id} value={inventory.id}>
              {inventory.name}
            </option>
          ))}
        </select>

        {editingBatch ? (
          <button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={handleUpdateBatch}
          >
            Update Batch
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={handleCreateBatch}
          >
            Add Batch
          </button>
        )}

        <button
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            showTrash ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setShowTrash(!showTrash)}
        >
          <FontAwesomeIcon icon={showTrash ? faEyeSlash : faEye} />
          {showTrash ? "Hide Trash" : "Show Trash"}
        </button>
      </div>

      {/* Table to show product batches */}
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="p-2 border-b">Quantity</th>
            <th className="p-2 border-b">Purchase Price</th>
            <th className="p-2 border-b">Product</th>

            <th className="p-2 border-b">Inventory</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBatches.map((batch) => (
            <tr key={batch.id}>
              <td className="p-2 border-b">{batch.quantity}</td>
              <td className="p-2 border-b">{batch.purchase_price}</td>
              <td className="p-2 border-b">
                {products.find((p) => p.id === batch.product_id)?.name}
              </td>
              <td className="p-2 border-b">{batch.inventory_name}</td>
              <td className="p-2 border-b">
                {batch.is_active ? "Active" : "Inactive"}
              </td>
              <td className="p-2 border-b flex gap-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setEditingBatch(batch)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                {showTrash && (
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteBatch(batch.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => toggleBatchDetails(batch.id)}
                >
                  <FontAwesomeIcon
                    icon={
                      selectedBatchDetails === batch.id ? faInfoCircle : faPlus
                    }
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBatchDetails && (
        <ProductBatchDetails batchId={selectedBatchDetails} />
      )}
    </div>
  );
};

export default ProductBatch;
