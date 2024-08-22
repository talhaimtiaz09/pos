import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function

const SalesRecord = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedStakeholder, setSelectedStakeholder] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [pendingFilter, setPendingFilter] = useState("");

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const salesResponse = await fetchData("sales", "GET");
        const customersResponse = await fetchData("customer", "GET");
        const productsResponse = await fetchData("product", "GET");
        const accountsResponse = await fetchData("account", "GET");
        const stakeholdersResponse = await fetchData("stakeholder", "GET");

        setSales(salesResponse.data || []);
        setFilteredSales(salesResponse.data || []);
        setCustomers(customersResponse.data || []);
        setProducts(productsResponse.data || []);
        setAccounts(accountsResponse.data || []);
        setStakeholders(stakeholdersResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    let filtered = sales.filter((sale) => {
      const customerName = customers
        .find((customer) => customer.id === sale.customer_id)
        ?.name.toLowerCase();
      const productName = products
        .find((product) => product.id === sale.product_id)
        ?.name.toLowerCase();

      return (
        (customerName?.includes(searchTerm.toLowerCase()) ||
          productName?.includes(searchTerm.toLowerCase())) &&
        (selectedCustomer
          ? sale.customer_id === parseInt(selectedCustomer)
          : true) &&
        (selectedProduct
          ? sale.product_id === parseInt(selectedProduct)
          : true) &&
        (selectedAccount
          ? sale.account_id === parseInt(selectedAccount)
          : true) &&
        (selectedStakeholder
          ? sale.stakeholder_id === parseInt(selectedStakeholder)
          : true) &&
        (pendingFilter ? sale.is_pending.toString() === pendingFilter : true) &&
        (dateRange.start && dateRange.end
          ? new Date(sale.date) >= new Date(dateRange.start) &&
            new Date(sale.date) <= new Date(dateRange.end)
          : true)
      );
    });

    setFilteredSales(filtered);
  }, [
    searchTerm,
    selectedCustomer,
    selectedProduct,
    selectedAccount,
    selectedStakeholder,
    pendingFilter,
    dateRange,
    sales,
    customers,
    products,
  ]);

  return (
    <div className="w-full mx-auto my-10 p-4 text-txt-white">
      <h2 className="text-2xl font-bold mb-6 text-txt-white">Sales Records</h2>

      <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search by customer or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        />

        <div className="flex space-x-4">
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          >
            <option value="">Select Customer</option>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))
            ) : (
              <option value="">N/A</option>
            )}
          </select>

          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          >
            <option value="">Select Product</option>
            {products.length > 0 ? (
              products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))
            ) : (
              <option value="">N/A</option>
            )}
          </select>

          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          >
            <option value="">Select Account</option>
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))
            ) : (
              <option value="">N/A</option>
            )}
          </select>

          <select
            value={selectedStakeholder}
            onChange={(e) => setSelectedStakeholder(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          >
            <option value="">Select Stakeholder</option>
            {stakeholders.length > 0 ? (
              stakeholders.map((stakeholder) => (
                <option key={stakeholder.id} value={stakeholder.id}>
                  {stakeholder.name}
                </option>
              ))
            ) : (
              <option value="">N/A</option>
            )}
          </select>

          <select
            value={pendingFilter}
            onChange={(e) => setPendingFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          >
            <option value="">Filter by Status</option>
            <option value="true">Pending</option>
            <option value="false">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          placeholder="Start Date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        />

        <input
          type="date"
          placeholder="End Date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="text-txt-black">
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Account</th>
              <th className="border px-4 py-2">Stakeholder</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
              filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="border px-4 py-2">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {customers.find(
                      (customer) => customer.id === sale.customer_id
                    )?.name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {products.find((product) => product.id === sale.product_id)
                      ?.name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">{sale.quantity}</td>
                  <td className="border px-4 py-2">{sale.price}</td>
                  <td className="border px-4 py-2">
                    {accounts.find((account) => account.id === sale.account_id)
                      ?.name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {stakeholders.find(
                      (stakeholder) => stakeholder.id === sale.stakeholder_id
                    )?.name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {sale.is_pending ? "Pending" : "Completed"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesRecord;
