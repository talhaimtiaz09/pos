import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import ProductBatchDetails from "./ProductBatchDetails";

const ProductBatch = () => {
  const [batchDetails, setBatchDetails] = useState([]);
  const [productBatches, setProductBatches] = useState([]);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [selectedBatchDetails, setSelectedBatchDetails] = useState(null);
  const [newBatch, setNewBatch] = useState({
    quantity: "",
    purchase_price: "",
    is_active: true,
    product_id: "",
    location_id: "",
    inventory_id: "",
  });
  const [editingBatch, setEditingBatch] = useState(null);
  const [error, setError] = useState(null);

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

    const getLocations = async () => {
      try {
        const response = await fetchData("/inventory/location", "GET");
        setLocations(response.data);
      } catch (err) {
        setError("Failed to fetch locations.");
      }
    };

    const getInventories = async () => {
      try {
        const response = await fetchData("/inventory", "GET");
        setInventories(response.data);
      } catch (err) {
        setError("Failed to fetch inventories.");
      }
    };

    getBatchDetails();
    getProductBatches();
    getProducts();
    getLocations();
    getInventories();
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
        location_id: "",
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Product Batches</h2>

      {error && <p className="text-red-500">{error}</p>}

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
        <select
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
              {location.location_name}
            </option>
          ))}
        </select>
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
              {inventory.inventory_name}
            </option>
          ))}
        </select>
        <button
          className="bg-primary text-txt-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={editingBatch ? handleUpdateBatch : handleCreateBatch}
        >
          <FontAwesomeIcon icon={editingBatch ? faEdit : faPlus} />
          {editingBatch ? "Update" : "Add"}
        </button>
      </div>

      <div className="space-y-4">
        {productBatches.map((batch) => (
          <div key={batch.id} className="border p-4 rounded-md bg-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <strong>Quantity:</strong> {batch.quantity || "N/A"}
                </p>
                <p>
                  <strong>Purchase Price:</strong>{" "}
                  {batch.purchase_price || "N/A"}
                </p>
                <p>
                  <strong>Product:</strong>{" "}
                  {products.find((p) => p.id === batch.product_id)?.name ||
                    "N/A"}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {locations.find((l) => l.id === batch.location_id)
                    ?.location_name || "N/A"}
                </p>
                <p>
                  <strong>Inventory:</strong>{" "}
                  {inventories.find((i) => i.id === batch.inventory_id)
                    ?.inventory_name || "N/A"}
                </p>
                <p>
                  <strong>Active:</strong> {batch.is_active ? "Yes" : "No"}
                </p>
                {batchDetails
                  .filter((detail) => detail.batch_id === batch.id)
                  .map((batch) => (
                    <div>
                      <p>
                        <strong>Batch No. :</strong> {batch.batch_number}
                      </p>
                      <p>
                        <strong>MFG data :</strong>{" "}
                        {batch.manufacture_date || "N/A"}
                      </p>
                      <p>
                        <strong>EXP data :</strong> {batch.expiry_date || "N/A"}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-500 text-txt-white px-3 py-1 rounded-md"
                  onClick={() => setEditingBatch(batch)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="bg-red-500 text-txt-white px-3 py-1 rounded-md"
                  onClick={() => handleDeleteBatch(batch.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="bg-green-500 text-txt-white px-3 py-1 rounded-md"
                  onClick={() => toggleBatchDetails(batch.id)}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </div>
            </div>

            {/* Render ProductBatchDetails for the selected batch */}
            {selectedBatchDetails === batch.id && (
              <ProductBatchDetails batch_id={batch.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBatch;
