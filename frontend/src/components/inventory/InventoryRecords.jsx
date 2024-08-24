import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import fetchData from "../../utils/fetchData";
const InventoryRecords = () => {
  const [records, setRecords] = useState([]);
  const [batches, setBatches] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [newRecord, setNewRecord] = useState({
    batch_id: "",
    quantity: "",
    record_type: "IN",
    inventory_id: "",
  });
  const [editingRecord, setEditingRecord] = useState(null);
  const [filter, setFilter] = useState({ batchId: "", recordType: "" });

  useEffect(() => {
    fetchRecords();
    fetchBatches();
    fetchInventories();
  }, []);

  const fetchRecords = async () => {
    const response = await fetchData("/inventory/record", "GET");
    setRecords(response.data);
  };

  const fetchBatches = async () => {
    const response = await fetchData("/inventory/batch", "GET");
    console.log("batch testing", response);
    setBatches(response.data);
  };

  const fetchInventories = async () => {
    const response = await fetchData("/inventory", "GET");
    setInventories(response.data);
  };

  const handleCreateOrUpdateRecord = async () => {
    if (editingRecord) {
      await axios.put(`/api/inventory-records/${editingRecord.id}`, newRecord);
    } else {
      await axios.post("/api/inventory-records", newRecord);
    }
    fetchRecords();
    setNewRecord({
      batch_id: "",
      quantity: "",
      record_type: "IN",
      inventory_id: "",
    });
    setEditingRecord(null);
  };

  const handleDeleteRecord = async (id) => {
    await axios.delete(`/api/inventory-records/${id}`);
    fetchRecords();
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredRecords = records.filter((record) => {
    return (
      (filter.batchId ? record.batch_id === parseInt(filter.batchId) : true) &&
      (filter.recordType ? record.record_type === filter.recordType : true)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">
        Inventory Records
      </h1>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded-md"
          name="batchId"
          value={filter.batchId}
          onChange={handleFilterChange}
        >
          <option value="">Filter by Batch</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.batch_name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded-md"
          name="recordType"
          value={filter.recordType}
          onChange={handleFilterChange}
        >
          <option value="">Filter by Record Type</option>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
          <option value="ADJUSTMENT">ADJUSTMENT</option>
        </select>
      </div>

      {/* Create or Edit Record Form */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editingRecord ? "Edit Record" : "Add New Record"}
        </h2>
        <div className="flex gap-4">
          <select
            className="border p-2 rounded-md flex-1"
            value={newRecord.batch_id}
            onChange={(e) =>
              setNewRecord({ ...newRecord, batch_id: e.target.value })
            }
          >
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="border p-2 rounded-md flex-1"
            placeholder="Quantity"
            value={newRecord.quantity}
            onChange={(e) =>
              setNewRecord({ ...newRecord, quantity: e.target.value })
            }
          />
          <select
            className="border p-2 rounded-md flex-1"
            value={newRecord.record_type}
            onChange={(e) =>
              setNewRecord({ ...newRecord, record_type: e.target.value })
            }
          >
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
            <option value="ADJUSTMENT">ADJUSTMENT</option>
          </select>
          <select
            className="border p-2 rounded-md flex-1"
            value={newRecord.inventory_id}
            onChange={(e) =>
              setNewRecord({ ...newRecord, inventory_id: e.target.value })
            }
          >
            <option value="">Select Inventory</option>
            {inventories.map((inventory) => (
              <option key={inventory.id} value={inventory.id}>
                {inventory.name}
              </option>
            ))}
          </select>
          <button
            className="bg-primary px-4 py-2 text-white rounded-md"
            onClick={handleCreateOrUpdateRecord}
          >
            {editingRecord ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Inventory Records Table */}
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr className="text-left ">
            <th className="p-2 border-b">Batch Id</th>
            <th className="p-2 border-b">Batch No.</th>
            <th className="p-2 border-b">Quantity</th>
            <th className="p-2 border-b">Record Type</th>
            <th className="p-2 border-b">Date</th>
            <th className="p-2 border-b">Inventory</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr
              key={record.id}
              className={`border-r-[16px] px-4 ${
                record.record_type == "IN" && "border-green-300"
              }
                ${record.record_type == "OUT" && "border-red-300"}
                ${record.record_type == "ADJUSTMENT" && "border-yellow-300"}`}
            >
              <td className="p-2 border-b">{record.id}</td>
              <td className="p-2 border-b">{record.batch_number}</td>
              <td className="p-2 border-b">{record.quantity}</td>
              <td className="p-2 border-b">{record.record_type}</td>
              <td className="p-2 border-b">
                {new Date(record.record_date).toLocaleDateString()}
              </td>
              <td className="p-2 border-b">{record.inventory_name}</td>
              <td className="p-2 border-b flex gap-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setEditingRecord(record)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteRecord(record.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryRecords;
