import React from "react";

const BatchForm = ({
  newBatch,
  setNewBatch,
  products,
  locations,
  inventories,
  handleCreateBatch,
  handleUpdateBatch,
  editingBatch,
  setEditingBatch,
}) => {
  return (
    <div className="mb-4 flex gap-2">
      <input
        type="number"
        placeholder="Quantity"
        className="border p-2 rounded-md w-full"
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
        className="border p-2 rounded-md w-full"
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
        className="border p-2 rounded-md w-full"
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
            {product.product_name}
          </option>
        ))}
      </select>
      <select
        className="border p-2 rounded-md w-full"
        value={editingBatch ? editingBatch.location_id : newBatch.location_id}
        onChange={(e) =>
          editingBatch
            ? setEditingBatch({ ...editingBatch, location_id: e.target.value })
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
        className="border p-2 rounded-md w-full"
        value={editingBatch ? editingBatch.inventory_id : newBatch.inventory_id}
        onChange={(e) =>
          editingBatch
            ? setEditingBatch({ ...editingBatch, inventory_id: e.target.value })
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
        className="bg-primary text-txt-white px-4 py-2 rounded-md"
        onClick={editingBatch ? handleUpdateBatch : handleCreateBatch}
      >
        {editingBatch ? "Update Batch" : "Create Batch"}
      </button>
      {editingBatch && (
        <button
          className="bg-gray-500 text-txt-white px-4 py-2 rounded-md"
          onClick={() => setEditingBatch(null)}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default BatchForm;
