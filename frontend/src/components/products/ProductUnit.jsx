import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductUnit = () => {
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState("");
  const [editUnit, setEditUnit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await fetchData("product/unit", "GET");
      console.log("Response", response);
      setUnits(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || "Error fetching units.");
      setLoading(false);
    }
  };

  const handleNewUnit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("product/unit", "POST", {
        name: newUnit,
      });
      setUnits([...units, response.data]);
      setNewUnit("");
    } catch (error) {
      setError(error.message || "Error adding new unit.");
    }
  };

  const handleEditUnit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(`product/unit/${editUnit.id}`, "PUT", {
        name: editUnit.name,
      });
      setUnits(
        units.map((unit) => (unit.id === editUnit.id ? response.data : unit))
      );
      setEditUnit(null);
    } catch (error) {
      setError(error.message || "Error editing unit.");
    }
  };

  const handleDeleteUnit = async (id) => {
    console.log("delete id", id);
    try {
      const res = await fetchData(`product/unit/${id}`, "DELETE");
      console.log("respone delete", res);
      setUnits(units.filter((unit) => unit.id !== id));
    } catch (error) {
      setError(error.message || "Error deleting unit.");
    }
  };

  const handleEditClick = (unit) => {
    setEditUnit(unit);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-black">Product Units</h2>

      {/* Add New Unit */}
      <form onSubmit={handleNewUnit} className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="New unit name"
          value={newUnit}
          onChange={(e) => setNewUnit(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Unit
        </button>
      </form>

      {/* Display Units */}
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Unit</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {units &&
            units.map((unit) => (
              <tr key={unit.id} className="bg-gray-100">
                <td className="py-2 px-4 border-b">
                  {editUnit && editUnit.id === unit.id ? (
                    <form onSubmit={handleEditUnit}>
                      <input
                        type="text"
                        value={editUnit.name}
                        onChange={(e) =>
                          setEditUnit({
                            ...editUnit,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 border rounded-lg bg-transparent border-2 border-slate-400"
                        required
                      />
                      <button
                        type="submit"
                        className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-2 ml-2 bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600"
                        onClick={() => setEditUnit(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <span>{unit.name}</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-600 transition"
                    onClick={() => handleEditClick(unit)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 transition"
                    onClick={() => handleDeleteUnit(unit.id)}
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

export default ProductUnit;
