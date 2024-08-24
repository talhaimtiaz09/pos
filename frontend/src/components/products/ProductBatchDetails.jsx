import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const ProductBatchDetails = ({ batch_id }) => {
  const [batchDetails, setBatchDetails] = useState([]);
  const [newBatch, setNewBatch] = useState({
    batch_number: "",
    manufacture_date: "",
    expiry_date: "",
    batch_id: batch_id,
  });
  const [editingBatch, setEditingBatch] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all batch details when the component mounts
  useEffect(() => {
    console.log("batch_id", batch_id);
    const getBatchDetails = async () => {
      try {
        const response = await fetchData("inventory/batch-detail", "GET");
        setBatchDetails(response.data);
      } catch (err) {
        setError("Failed to fetch batch details.");
      }
    };
    getBatchDetails();
  }, []);

  // Handle creation of a new batch
  const handleCreateBatch = async () => {
    try {
      const response = await fetchData(
        "inventory/batch-detail",
        "POST",
        newBatch
      );
      setBatchDetails([...batchDetails, response.data]);
      setNewBatch({ batch_number: "", manufacture_date: "", expiry_date: "" });
    } catch (err) {
      setError("Failed to create batch.");
    }
  };

  // Handle updating a batch
  const handleUpdateBatch = async () => {
    try {
      await fetchData(
        `inventory/batch-detail/${editingBatch.id}`,
        "PUT",
        editingBatch
      );
      setBatchDetails(
        batchDetails.map((batch) =>
          batch.id === editingBatch.id ? editingBatch : batch
        )
      );
      setEditingBatch(null);
    } catch (err) {
      setError("Failed to update batch.");
    }
  };

  // Handle deleting a batch
  const handleDeleteBatch = async (id) => {
    try {
      await fetchData(`inventory/batch-detail/${id}`, "DELETE");
      setBatchDetails(batchDetails.filter((batch) => batch.id !== id));
    } catch (err) {
      setError("Failed to delete batch.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Batch Details</h2>

      {/* Form for creating or editing a batch */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Batch Number"
          className="border p-2 rounded-md w-full"
          value={
            editingBatch ? editingBatch.batch_number : newBatch.batch_number
          }
          onChange={(e) =>
            editingBatch
              ? setEditingBatch({
                  ...editingBatch,
                  batch_number: e.target.value,
                })
              : setNewBatch({ ...newBatch, batch_number: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Manufacture Date"
          className="border p-2 rounded-md w-full"
          value={
            editingBatch
              ? editingBatch.manufacture_date
              : newBatch.manufacture_date
          }
          onChange={(e) =>
            editingBatch
              ? setEditingBatch({
                  ...editingBatch,
                  manufacture_date: e.target.value,
                })
              : setNewBatch({ ...newBatch, manufacture_date: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Expiry Date"
          className="border p-2 rounded-md w-full"
          value={editingBatch ? editingBatch.expiry_date : newBatch.expiry_date}
          onChange={(e) =>
            editingBatch
              ? setEditingBatch({
                  ...editingBatch,
                  expiry_date: e.target.value,
                })
              : setNewBatch({ ...newBatch, expiry_date: e.target.value })
          }
        />
        <button
          className="bg-primary text-txt-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={editingBatch ? handleUpdateBatch : handleCreateBatch}
        >
          <FontAwesomeIcon icon={editingBatch ? faEdit : faPlus} />
          {editingBatch ? "Update" : "Add"}
        </button>
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Table of batch details */}
      {/* <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Batch Number</th>
            <th className="border p-2">Manufacture Date</th>
            <th className="border p-2">Expiry Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {batchDetails.map((batch) => (
            <tr key={batch.id}>
              <td className="border p-2">{batch.batch_number}</td>
              <td className="border p-2">{batch.manufacture_date || "N/A"}</td>
              <td className="border p-2">{batch.expiry_date || "N/A"}</td>
              <td className="border p-2 flex gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default ProductBatchDetails;
