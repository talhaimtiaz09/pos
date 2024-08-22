import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function

const PAGE_SIZE = 8; // Number of customers per page

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await fetchData("/customer", "GET");
        setCustomers(response.data);
        setTotalPages(Math.ceil(response.data.length / PAGE_SIZE));
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching customers.");
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  useEffect(() => {
    let results = customers;

    if (searchQuery) {
      results = results.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLetter) {
      results = results.filter((customer) =>
        customer.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }

    setFilteredCustomers(results);
    setTotalPages(Math.ceil(results.length / PAGE_SIZE));
  }, [searchQuery, selectedLetter, customers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleLetterFilter = (letter) => {
    console.log("letter selected: ", letter);
    setSelectedLetter(letter);

    setCurrentPage(1); // Reset to the first page when filtering by letter
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredCustomers.length);
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4">
      <div className="bg-ice-white rounded-md   p-4">
        <h2 className="text-2xl font-bold mb-6 text-primary">Customer List</h2>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-3 py-2 border rounded-lg border-gray-300"
          />
        </div>
      </div>

      {/* Filter by Letter */}
      <div className="mb-6 bg-ice-white my-4 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Filter by Letter:</h3>
        <div className="flex items-center flex-wrap mb-4">
          <select
            className="w-32 rounded-md mr-4 py-1 px-4 "
            onChange={(e) => handleLetterFilter(e.target.value)}
          >
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <option
                key={letter}
                value={letter}
                className={`mr-2 mb-2 px-3 py-1 border rounded-lg ${
                  selectedLetter === letter
                    ? "bg-primary text-txt-white"
                    : "bg-gray-200"
                }`}
              >
                {letter}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleLetterFilter("")}
            className={`mr-2  px-8 py-1 border rounded-lg ${
              !selectedLetter ? "bg-primary text-txt-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setEnableEdit(!enableEdit)}
            className={`mr-2  px-8 py-1 border-[1px] rounded-lg hover:bg-primary hover:text-txt-white ${
              enableEdit
                ? "bg-primary text-txt-white"
                : "bg-gray-200 border-gray-500"
            }`}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Address</th>
            <th className="px-4 py-2 border-b text-left">Phone</th>
            {enableEdit && (
              <th className="px-4 py-2 border-b text-left">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.length > 0 ? (
            paginatedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-2 border-b">{customer.name || "N/A"}</td>
                <td className="px-4 py-2 border-b">
                  {customer.address || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {customer.phone || "N/A"}
                </td>
                {enableEdit && (
                  <td className="px-4 py-2 border-b">
                    <button className="bg-primary text-txt-white py-1 px-2 rounded hover:bg-primary-hover transition">
                      Edit
                    </button>
                    <button className="bg-red-500 text-txt-white py-1 px-2 ml-2 rounded hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 border-b text-center">
                No customers available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 border rounded-lg ${
              currentPage === i + 1
                ? "bg-primary text-txt-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
