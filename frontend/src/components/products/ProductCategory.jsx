import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [editSubcategory, setEditSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryResponse = await fetchData("product/category", "GET");
        const subcategoryResponse = await fetchData(
          "product/subcategory",
          "GET"
        );

        console.log("categoryResponse", categoryResponse.data);
        console.log("subcategoryResponse", subcategoryResponse.data);
        setCategories(categoryResponse.data);
        setSubcategories(subcategoryResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching categories.");
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleNewCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/product/category", "POST", {
        category_name: newCategory,
      });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (err) {
      setError(err.message || "An error occurred while adding the category.");
    }
  };
  const handleNewSubcategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/product/subcategory", "POST", {
        subcategory_name: newSubcategory,
        category_id: selectedCategory,
      });
      setSubcategories([...subcategories, response.data]);
      setNewSubcategory("");
    } catch (err) {
      setError(err.message || "An error occurred while adding the category.");
    }
  };

  const handleEditCategory = async (e) => {
    console.log("sending post request with body", editCategory);
    e.preventDefault();
    try {
      const response = await fetchData(
        `/product/category/${editCategory.id}`,
        "PUT",
        { category_name: editCategory.category_name }
      );
      setCategories(
        categories.map((cat) =>
          cat.id === editCategory.id ? response.data : cat
        )
      );
      setEditCategory(null);
    } catch (err) {
      setError(err.message || "An error occurred while editing the category.");
    }
  };

  const handleEditSubcategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        `product/subcategory/${editSubcategory.id}`,
        "PUT",
        { subcategory_name: editSubcategory.subcategory_name }
      );
      setSubcategories(
        subcategories.map((sub) =>
          sub.id === editSubcategory.id ? response.data : sub
        )
      );
      setEditSubcategory(null);
    } catch (err) {
      setError(
        err.message || "An error occurred while editing the subcategory."
      );
    }
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
    setEditSubcategory(null);
  };

  const handleEditSubClick = (subcategory) => {
    setEditSubcategory(subcategory);
    setEditCategory(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-black">Product Categories</h2>

      {/* Add New Category */}
      <form onSubmit={handleNewCategory} className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>

      {/* Add New SubCategory */}
      <form onSubmit={handleNewSubcategory} className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="New Subcategory name"
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        />
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Subcategory
        </button>
      </form>

      {/* Display Categories */}
      <h3 className="text-xl font-bold mb-4 text-black">Categories</h3>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="bg-gray-100">
              <td className="py-2 px-4 border-b">
                {editCategory && editCategory.id === category.id ? (
                  <form onSubmit={handleEditCategory}>
                    <input
                      type="text"
                      value={editCategory.category_name}
                      onChange={(e) =>
                        setEditCategory({
                          ...editCategory,
                          category_name: e.target.value,
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
                      onClick={() => setEditCategory(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <span>{category.category_name}</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-slate-500 hover:text-slate-800 text-lg transition"
                  onClick={() => handleEditClick(category)}
                >
                  <FontAwesomeIcon icon={"fas fa-edit"} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Subcategories */}
      <h3 className="text-xl font-bold mb-4 mt-6 text-black">Subcategories</h3>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b">Subcategory</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((sub) => (
            <tr key={sub.id} className="bg-gray-100">
              <td className="py-2 px-4 border-b">
                {editSubcategory && editSubcategory.id === sub.id ? (
                  <form onSubmit={handleEditSubcategory}>
                    <input
                      type="text"
                      value={editSubcategory.subcategory_name}
                      onChange={(e) =>
                        setEditSubcategory({
                          ...editSubcategory,
                          subcategory_name: e.target.value,
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
                      onClick={() => setEditSubcategory(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <span>{sub.subcategory_name}</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {
                  categories.find((cat) => cat.id === sub.category_id)
                    ?.category_name
                }
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-slate-500 hover:text-slate-800 text-lg transition"
                  onClick={() => handleEditSubClick(sub)}
                >
                  <FontAwesomeIcon icon={"fas fa-edit"} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategory;
