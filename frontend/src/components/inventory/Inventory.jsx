import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [newInventory, setNewInventory] = useState({ inventory_name: "" });
  const [editInventory, setEditInventory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInventories = async () => {
      try {
        const response = await fetchData("/inventory", "GET");
        setInventories(response.data);
      } catch (err) {
        setError("Failed to fetch inventory.");
      }
    };
    getInventories();
  }, []);

  const handleCreateInventory = async () => {
    try {
      console.log("newInventory obj: ", newInventory);
      console.log("inventories: ", inventories);
      const res = await fetchData("/inventory", "POST", newInventory);

      setInventories([...inventories, res.data]);
      setNewInventory({ inventory_name: "" });
    } catch (err) {
      setError("Failed to create inventory.");
    }
  };

  const handleEditInventory = async (id) => {
    try {
      await fetchData(`/inventory/${id}`, "PUT", editInventory);
      setInventories(
        inventories.map((inv) =>
          inv.id === id ? { ...inv, ...editInventory } : inv
        )
      );
      setEditInventory(null);
    } catch (err) {
      setError("Failed to update inventory.");
    }
  };

  const handleDeleteInventory = async (id) => {
    try {
      await fetchData(`/inventory/${id}`, "DELETE");
      setInventories(inventories.filter((inv) => inv.id !== id));
    } catch (err) {
      setError("Failed to delete inventory.");
    }
  };

  return (
    <div className="p-6 shadow-md w-full rounded-lg">
      <div className="p-4 rounded-md bg-ice-white my-4">
        <h2 className="text-2xl font-bold mb-4">Inventory</h2>

        {/* Add New Inventory */}
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Inventory Name"
            value={newInventory.inventory_name}
            onChange={(e) =>
              setNewInventory({
                ...newInventory,
                inventory_name: e.target.value,
              })
            }
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={handleCreateInventory}
            className="px-4 py-2 bg-primary text-txt-white rounded-lg flex items-center gap-2 hover:bg-primary-hover"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Inventory
          </button>
        </div>
      </div>
      {error && (
        <div className="p-4 rounded-md bg-ice-white border-[2px] border-red-400">
          <p className="font-bold">ERROR:</p>
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Inventory List */}
      {inventories.length > 0 ? (
        <table className="w-full border-collapse bg-white ">
          <thead>
            <tr className="bg-slate-300 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory) => (
              <tr key={inventory.id}>
                <td className="p-2 border">{inventory.id}</td>
                <td className="p-2 border">
                  {editInventory?.id === inventory.id ? (
                    <input
                      type="text"
                      value={editInventory.inventory_name}
                      onChange={(e) =>
                        setEditInventory({
                          ...editInventory,
                          inventory_name: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 border rounded"
                      placeholder="Enter inventory name"
                    />
                  ) : (
                    inventory.inventory_name || "N/A"
                  )}
                </td>
                <td className="p-2 border">
                  {editInventory?.id === inventory.id ? (
                    <>
                      <button
                        onClick={() => handleEditInventory(inventory.id)}
                        className="px-2 py-1 bg-green-500 text-txt-white rounded-lg mr-2 hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditInventory(null)}
                        className="px-2 py-1 bg-gray-500 text-txt-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditInventory(inventory)}
                        className="px-2 py-1 bg-yellow-500 text-txt-white rounded-lg mr-2 hover:bg-yellow-600"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteInventory(inventory.id)}
                        className="px-2 py-1 bg-red-500 text-txt-white rounded-lg hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No inventory items found.</p>
      )}
    </div>
  );
};

export default Inventory;
