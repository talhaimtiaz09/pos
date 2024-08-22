import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function

const ProductRegisterForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category_id: "",
    sub_category_id: "",
    short_name: "",
    unit_id: "",
    supplier_id: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoryResponse = await fetchData("product/category", "GET");
        const subcategoryResponse = await fetchData(
          "product/subcategory",
          "GET"
        );
        const unitResponse = await fetchData("product/unit", "GET");
        const companyResponse = await fetchData("company", "GET");

        setCategories(categoryResponse.data || []);
        setSubcategories(subcategoryResponse.data || []);
        setUnits(unitResponse.data || []);
        setCompanies(companyResponse.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/product", "POST", newProduct);
      alert("Product added successfully!");
      setNewProduct({
        name: "",
        category_id: "",
        sub_category_id: "",
        short_name: "",
        unit_id: "",
        supplier_id: "",
      });
    } catch (err) {
      setError(err.message || "An error occurred while adding the product.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto my-10 text-txt-white">
      <h2 className="text-2xl font-bold mb-6 ">Add Product</h2>

      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        />
        <input
          type="text"
          name="short_name"
          placeholder="Short Name"
          value={newProduct.short_name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, short_name: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        />
        <select
          name="category_id"
          value={newProduct.category_id}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category_id: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        >
          <option value="">Select Category</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))
          ) : (
            <option value="">N/A</option>
          )}
        </select>
        <select
          name="sub_category_id"
          value={newProduct.sub_category_id}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sub_category_id: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        >
          <option value="">Select Subcategory</option>
          {subcategories.length > 0 ? (
            subcategories
              .filter((sub) => sub.category_id == newProduct.category_id)
              .map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.subcategory_name}
                </option>
              ))
          ) : (
            <option value="">N/A</option>
          )}
        </select>
        <select
          name="unit_id"
          value={newProduct.unit_id}
          onChange={(e) =>
            setNewProduct({ ...newProduct, unit_id: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        >
          <option value="">Select Unit</option>
          {units.length > 0 ? (
            units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))
          ) : (
            <option value="">N/A</option>
          )}
        </select>
        <select
          name="supplier_id"
          value={newProduct.supplier_id}
          onChange={(e) =>
            setNewProduct({ ...newProduct, supplier_id: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        >
          <option value="">Select Supplier</option>
          {companies.length > 0 ? (
            companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))
          ) : (
            <option value="">N/A</option>
          )}
        </select>

        <button
          type="submit"
          className="bg-primary text-txt-white py-2 px-4 rounded-lg hover:bg-primary-hover"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductRegisterForm;
