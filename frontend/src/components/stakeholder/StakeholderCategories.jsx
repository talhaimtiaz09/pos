import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function
import axios from "axios";

const StakeholderCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchData("/stakeholder/category", "GET");
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch categories.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory) return;

    try {
      await fetchData("/stakeholder/category", "POST", { name: newCategory });
      setNewCategory("");
      const response = await fetchData("/stakeholder/category", "GET");
      setCategories(response.data);
    } catch (err) {
      setError(err.message || "Failed to add category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await fetchData(`/stakeholder/category/${id}`, "DELETE");
      const response = await fetchData("/stakeholder/category", "GET");
      setCategories(response.data);
    } catch (err) {
      setError(err.message || "Failed to delete category.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" w-2/3 mx-10 my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Stakeholder Categories
      </h2>

      {/* Add Category Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 mb-2"
        />
        <button
          onClick={handleAddCategory}
          className="w-full py-2 bg-primary text-txt-white rounded-lg hover:bg-primary-hover transition"
        >
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <ul className="bg-white border border-gray-300 rounded-lg shadow">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li
              key={category.id}
              className="px-4 py-2 flex justify-between items-center border-b border-gray-200"
            >
              <span>{category.name}</span>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-500 hover:text-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-center">No categories available</li>
        )}
      </ul>
    </div>
  );
};

export default StakeholderCategories;
