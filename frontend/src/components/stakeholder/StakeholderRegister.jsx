import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function

const StakeholderRegister = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newStakeholder, setNewStakeholder] = useState({
    name: "",
    contact: "",
    address: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const [stakeholderRes, categoryRes] = await Promise.all([
          fetchData("/stakeholder", "GET"),
          fetchData("/stakeholder/category", "GET"),
        ]);
        setStakeholders(stakeholderRes.data);
        setCategories(categoryRes.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchStakeholders();
  }, []);

  const handleAddStakeholder = async () => {
    try {
      await fetchData("/stakeholder", "POST", newStakeholder);
      setNewStakeholder({
        name: "",
        contact: "",
        address: "",
        category: "",
      });
      const response = await fetchData("/stakeholder", "GET");
      setStakeholders(response.data);
    } catch (err) {
      setError(err.message || "Failed to add stakeholder.");
    }
  };

  const handleDeleteStakeholder = async (id) => {
    try {
      await fetchData(`/stakeholder/${id}`, "DELETE");
      const response = await fetchData("/stakeholder", "GET");
      setStakeholders(response.data);
    } catch (err) {
      setError(err.message || "Failed to delete stakeholder.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4">
      <div className="my-8 p-10 bg-ice-white rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">Stakeholders</h2>

        {/* Add Stakeholder Form */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newStakeholder.name}
            onChange={(e) =>
              setNewStakeholder({ ...newStakeholder, name: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg border-gray-300 mb-2"
          />
          <input
            type="text"
            placeholder="Contact"
            value={newStakeholder.contact}
            onChange={(e) =>
              setNewStakeholder({ ...newStakeholder, contact: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg border-gray-300 mb-2"
          />
          <textarea
            placeholder="Address"
            value={newStakeholder.address}
            onChange={(e) =>
              setNewStakeholder({ ...newStakeholder, address: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg border-gray-300 mb-2"
          />
          <select
            value={newStakeholder.category}
            onChange={(e) =>
              setNewStakeholder({ ...newStakeholder, category: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg border-gray-300 mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddStakeholder}
            className="w-full py-2 bg-primary text-txt-white rounded-lg hover:bg-primary-hover transition"
          >
            Add Stakeholder
          </button>
        </div>
      </div>

      {/* Stakeholders List */}
      <table className="w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Contact</th>
            <th className="px-4 py-2 border-b text-left">Address</th>
            <th className="px-4 py-2 border-b text-left">Category</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stakeholders.length > 0 ? (
            stakeholders.map((stakeholder) => (
              <tr key={stakeholder.id}>
                <td className="px-4 py-2 border-b">
                  {stakeholder.name || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {stakeholder.contact || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {stakeholder.address || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {categories.find((cat) => cat.id === stakeholder.category)
                    ?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDeleteStakeholder(stakeholder.id)}
                    className="bg-red-500 text-txt-white py-1 px-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 border-b text-center">
                No stakeholders available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StakeholderRegister;
