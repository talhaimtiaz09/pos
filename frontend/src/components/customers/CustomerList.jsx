import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function

const PAGE_SIZE = 5; // Number of customers per page

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await fetchData("/customer/get-all", "GET");
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
    <div className="w-2/3 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-black">Customer List</h2>

      {/* Search and Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-1 border-slate-100"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Filter by Letter:</h3>
        <div className="flex flex-wrap">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterFilter(letter)}
              className={`mr-2 mb-2 px-3 py-1 border rounded-lg ${
                selectedLetter === letter
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {letter}
            </button>
          ))}
          <button
            onClick={() => handleLetterFilter("")}
            className={`mr-2 mb-2 px-3 py-1 border rounded-lg ${
              !selectedLetter ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Customer List */}
      <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {paginatedCustomers.map((customer) => (
          <li
            key={customer.id}
            className="p-4 hover:bg-gray-100 transition flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{customer.name}</p>
              <p className="text-gray-600">{customer.address}</p>
              <p className="text-gray-600">{customer.phone}</p>
            </div>
            <div>
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition">
                Edit
              </button>
              <button className="bg-red-500 text-white py-1 px-3 ml-2 rounded hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
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
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
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
