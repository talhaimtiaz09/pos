import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData"; // Adjust this path to your fetchData utility

const TransactionLog = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({
    account_id: "",
    transaction_type: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchData("account/transaction", "GET");
        setTransactions(response.data || []);
        setFilteredTransactions(response.data || []);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await fetchData("account", "GET");
        setAccounts(response.data || []);
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      }
    };

    fetchTransactions();
    fetchAccounts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);

    // Update the filters state based on the input change
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    // Apply filtering logic
    const filtered = transactions.filter((transaction) => {
      const matchesAccount =
        updatedFilters.account_id === "" ||
        transaction.from_account_id === parseInt(updatedFilters.account_id) ||
        transaction.to_account_id === parseInt(updatedFilters.account_id);

      const matchesType =
        updatedFilters.transaction_type === "" ||
        transaction.transaction_type === updatedFilters.transaction_type;

      // Return true if both filters match
      return matchesAccount && matchesType;
    });

    // Update the filtered transactions
    setFilteredTransactions(filtered);
  };

  return (
    <div className="transaction-log p-4 bg-ice-white rounded-md my-10">
      <h2 className="text-primary font-bold text-2xl">Transaction Log</h2>

      <div className="flex flex-col md:flex-row md:justify-between my-4">
        <div className="flex flex-col my-2 md:my-0">
          <label className="font-semibold">Filter by Account</label>
          <select
            name="account_id"
            className="p-2 border rounded-md"
            value={filters.account_id}
            onChange={handleFilterChange}
          >
            <option value="">All Accounts</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col my-2 md:my-0">
          <label className="font-semibold">Filter by Transaction Type</label>
          <select
            name="transaction_type"
            className="p-2 border rounded-md"
            value={filters.transaction_type}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="TRANSFER">Transfer</option>
            <option value="DEPOSIT">Deposit</option>
            <option value="WITHDRAWAL">Withdrawal</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">From Account</th>
              <th className="py-2 px-4 border-b">To Account</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={`${
                  transaction.transaction_type === "DEPOSIT"
                    ? "bg-green-200"
                    : transaction.transaction_type === "WITHDRAWAL"
                    ? "bg-red-200"
                    : "bg-yellow-200"
                }`}
              >
                <td className="py-2 px-4 border-b">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.from_account_name}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.to_account_name}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.transaction_type}
                </td>
                <td className="py-2 px-4 border-b">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionLog;
