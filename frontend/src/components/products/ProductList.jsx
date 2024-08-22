import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [units, setUnits] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const productsResponse = await fetchData("product", "GET");
        const companiesResponse = await fetchData("company", "GET");
        const categoriesResponse = await fetchData("product/category", "GET");
        const unitResponse = await fetchData("product/unit", "GET");
        const subcategoryResponse = await fetchData(
          "product/subcategory",
          "GET"
        );
        setSubcategories(subcategoryResponse.data || []);
        setUnits(unitResponse.data || []);
        setProducts(productsResponse.data || []);
        setFilteredProducts(productsResponse.data || []);
        setCompanies(companiesResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCompany) {
      filtered = filtered.filter(
        (product) => product.supplier_id === parseInt(selectedCompany)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category_id === parseInt(selectedCategory)
      );
    }

    if (alphabetFilter) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().startsWith(alphabetFilter.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCompany, selectedCategory, alphabetFilter, products]);

  return (
    <div className="w-full mx-auto my-10 p-4">
      <div className="p-4 rounded-lg bg-ice-white my-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Product List</h2>

        <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          />

          <div className="flex space-x-4">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
            >
              <option value="">Select Company</option>
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

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
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
              value={alphabetFilter}
              onChange={(e) => setAlphabetFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
            >
              <option value="">Filter by Alphabet</option>
              {[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Subcategory</th>
              <th className="border px-4 py-2">Unit</th>
              <th className="border px-4 py-2">Supplier</th>
            </tr>
          </thead>
          <tbody className="text-txt-white">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">
                    {categories.find((cat) => cat.id === product.category_id)
                      ?.category_name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {subcategories.find(
                      (cat) => cat.id === product.sub_category_id
                    )?.subcategory_name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {units && units.find((unit) => unit.id === product.unit_id)
                      ? product.unit_name
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {companies.find(
                      (company) => company.id === product.supplier_id
                    )?.name || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
