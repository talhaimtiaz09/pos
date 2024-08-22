import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

const InventoryRecords = () => {
  const [inventoryRecords, setInventoryRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    batch_id: "",
    quantity: "",
    record_type: "IN",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInventoryRecords = async () => {
      try {
        const response = await fetchData("/inventory-records/get-all", "GET");
        setInventoryRecords(response.data);
      } catch (err) {
        setError("Failed to fetch inventory records.");
      }
    };
    getInventoryRecords();
  }, []);

  const handleCreateRecord = async () => {
    try {
      await fetchData("/inventory-records/register", "POST", newRecord);
      setInventoryRecords([...inventoryRecords, newRecord]);
      setNewRecord({ batch_id: "", quantity: "", record_type: "IN" });
    } catch (err) {
      setError("Failed to create inventory record.");
    }
  };

  return (
    <div>
      <h2>Inventory Records</h2>
      <input
        type="number"
        placeholder="Batch ID"
        value={newRecord.batch_id}
        onChange={(e) =>
          setNewRecord({ ...newRecord, batch_id: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newRecord.quantity}
        onChange={(e) =>
          setNewRecord({ ...newRecord, quantity: e.target.value })
        }
      />
      <select
        value={newRecord.record_type}
        onChange={(e) =>
          setNewRecord({ ...newRecord, record_type: e.target.value })
        }
      >
        <option value="IN">IN</option>
        <option value="OUT">OUT</option>
        <option value="ADJUSTMENT">ADJUSTMENT</option>
      </select>
      <button onClick={handleCreateRecord}>Add Record</button>

      {error && <p>{error}</p>}
      <ul>
        {inventoryRecords.map((record) => (
          <li key={record.id}>
            Batch ID: {record.batch_id} - Quantity: {record.quantity} - Type:{" "}
            {record.record_type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryRecords;
