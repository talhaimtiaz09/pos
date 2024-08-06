import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompanyRegister = () => {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    category: "",
    subcategory: "",
  });
  const [newSalesRep, setNewSalesRep] = useState({
    name: "",
    contact: "",
    address: "",
    company_id: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCompany, setEditCompany] = useState(null);
  const [editSalesRep, setEditSalesRep] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoryResponse = await fetchData("product/category", "GET");
        const subcategoryResponse = await fetchData(
          "product/subcategory",
          "GET"
        );
        const companyResponse = await fetchData("company", "GET");

        setCategories(categoryResponse.data || []);
        setSubcategories(subcategoryResponse.data || []);
        console.log("subcategories", subcategoryResponse.data);
        console.log("categories", categoryResponse.data);
        setCompanies(companyResponse.data || []);
        setLoading(false);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching initial data."
        );
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleNewCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/company", "POST", newCompany);
      setCompanies([...companies, response.data]);
      setNewCompany({ name: "", category: "", subcategory: "" });
    } catch (err) {
      setError(err.message || "An error occurred while adding the company.");
    }
  };

  const handleNewSalesRep = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        "/company-sales-rep",
        "POST",
        newSalesRep
      );
      setNewSalesRep({ name: "", contact: "", address: "", company_id: "" });
    } catch (err) {
      setError(
        err.message ||
          "An error occurred while adding the sales representative."
      );
    }
  };

  const handleEditCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(`/company/${editCompany.id}`, "PUT", {
        name: editCompany.name,
      });
      setCompanies(
        companies.map((company) =>
          company.id === editCompany.id ? response.data : company
        )
      );
      setEditCompany(null);
    } catch (err) {
      setError(err.message || "An error occurred while editing the company.");
    }
  };

  const handleEditSalesRep = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        `/company-sales-rep/${editSalesRep.id}`,
        "PUT",
        {
          name: editSalesRep.name,
          contact: editSalesRep.contact,
          address: editSalesRep.address,
          company_id: editSalesRep.company_id,
        }
      );
      setCompanies(
        companies.map((rep) =>
          rep.id === editSalesRep.id ? response.data : rep
        )
      );
      setEditSalesRep(null);
    } catch (err) {
      setError(
        err.message ||
          "An error occurred while editing the sales representative."
      );
    }
  };

  const handleEditClick = (company) => {
    setEditCompany(company);
    setEditSalesRep(null);
  };

  const handleEditRepClick = (rep) => {
    setEditSalesRep(rep);
    setEditCompany(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-black">Register Company</h2>

      {/* Add New Company */}
      <form onSubmit={handleNewCompany} className="mb-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={newCompany.name}
          onChange={(e) =>
            setNewCompany({ ...newCompany, name: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        />
        <select
          name="category"
          value={newCompany.category}
          onChange={(e) =>
            setNewCompany({ ...newCompany, category: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <select
          name="subcategory"
          value={newCompany.subcategory}
          onChange={(e) =>
            setNewCompany({ ...newCompany, subcategory: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories
            .filter(
              (subcategory) => subcategory.category_id == newCompany.category
            )
            .map((filteredSubcategory) => (
              <option
                key={filteredSubcategory.id}
                value={filteredSubcategory.id}
              >
                {filteredSubcategory.subcategory_name}
              </option>
            ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Company
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6 text-black">
        Register Sales Representative
      </h2>

      {/* Add New Sales Rep */}
      <form onSubmit={handleNewSalesRep} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Sales Rep Name"
          value={newSalesRep.name}
          onChange={(e) =>
            setNewSalesRep({ ...newSalesRep, name: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={newSalesRep.contact}
          onChange={(e) =>
            setNewSalesRep({ ...newSalesRep, contact: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newSalesRep.address}
          onChange={(e) =>
            setNewSalesRep({ ...newSalesRep, address: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        />
        <select
          name="company_id"
          value={newSalesRep.company_id}
          onChange={(e) =>
            setNewSalesRep({ ...newSalesRep, company_id: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Sales Rep
        </button>
      </form>

      {/* Display Companies */}
      <h3 className="text-xl font-bold mb-4 text-black">Companies</h3>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Subcategory</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="bg-gray-100">
              <td className="py-2 px-4 border-b">
                {editCompany && editCompany.id === company.id ? (
                  <form onSubmit={handleEditCompany}>
                    <input
                      type="text"
                      value={editCompany.name}
                      onChange={(e) =>
                        setEditCompany({ ...editCompany, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600 ml-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 ml-2"
                      onClick={() => setEditCompany(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    {company.name}
                    <button
                      className="ml-2 text-blue-500 hover:underline"
                      onClick={() => handleEditClick(company)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {categories.find((cat) => cat.id === company.category)
                  ?.category_name || "N/A"}
              </td>
              <td className="py-2 px-4 border-b">
                {subcategories.find((sub) => sub.id === company.subcategory)
                  ?.subcategory_name || "N/A"}
              </td>
              <td className="py-2 px-4 border-b">
                {/* Add buttons for Edit/Delete if necessary */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Sales Representatives */}
      <h3 className="text-xl font-bold mb-4 text-black">
        Sales Representatives
      </h3>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Contact</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies
            .flatMap((company) => company.sales_representatives)
            .map((rep) => (
              <tr key={rep.id} className="bg-gray-100">
                <td className="py-2 px-4 border-b">
                  {editSalesRep && editSalesRep.id === rep.id ? (
                    <form onSubmit={handleEditSalesRep}>
                      <input
                        type="text"
                        value={editSalesRep.name}
                        onChange={(e) =>
                          setEditSalesRep({
                            ...editSalesRep,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
                        required
                      />
                      <input
                        type="text"
                        value={editSalesRep.contact}
                        onChange={(e) =>
                          setEditSalesRep({
                            ...editSalesRep,
                            contact: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
                      />
                      <input
                        type="text"
                        value={editSalesRep.address}
                        onChange={(e) =>
                          setEditSalesRep({
                            ...editSalesRep,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
                      />
                      <select
                        value={editSalesRep.company_id}
                        onChange={(e) =>
                          setEditSalesRep({
                            ...editSalesRep,
                            company_id: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
                        required
                      >
                        <option value="">Select Company</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600 ml-2"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 ml-2"
                        onClick={() => setEditSalesRep(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      {rep.name}
                      <button
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => handleEditRepClick(rep)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
                <td className="py-2 px-4 border-b">{rep.contact}</td>
                <td className="py-2 px-4 border-b">{rep.address}</td>
                <td className="py-2 px-4 border-b">
                  {companies.find((comp) => comp.id === rep.company_id)?.name ||
                    "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {/* Add buttons for Edit/Delete if necessary */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyRegister;
