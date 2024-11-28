import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faTrashAlt,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import fetchData from "../../utils/fetchData";

const formatCurrency = (amount) => {
  if (!amount) return "N/A";
  const num = parseFloat(amount);
  if (isNaN(num)) return "N/A";

  const lac = Math.floor(num / 100000);
  const rupees = num % 100000;

  return `${lac > 0 ? `${lac.toLocaleString()} lac ` : ""}${
    rupees > 0 ? `${rupees.toLocaleString()} rupees` : ""
  }`.trim();
};

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const [visibility, setVisibility] = useState({});

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetchData("/account", "GET");
        const accountData = response.data.reduce(
          (acc, account) => ({
            ...acc,
            [account.id]: { balance: false, limits: false },
          }),
          {}
        );
        setAccounts(response.data);
        setVisibility(accountData);
      } catch (err) {
        console.error(err.message || "Failed to fetch accounts.");
      }
    };
    fetchAccounts();
  }, []);

  const toggleVisibility = (id, field) => {
    setVisibility((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: !prev[id][field] },
    }));
  };

  const handleDeleteAccount = async (id) => {
    try {
      await fetchData(`/account/${id}`, "DELETE");
      setAccounts((prev) => prev.filter((account) => account.id !== id));
    } catch (err) {
      console.error(err.message || "Failed to delete account.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Accounts List</h2>
      {accounts.length > 0 ? (
        <table className="min-w-full bg-white border rounded-md shadow-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">Account Name</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Category</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Limits</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id} className="border-t">
                <td className="p-4 text-gray-800">{account.name}</td>
                <td className="p-4 text-gray-600">
                  {account.owner_name || "N/A"}
                </td>
                <td className="p-4 text-blue-600">{account.category_name}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    {visibility[account.id]?.balance
                      ? formatCurrency(account.balance)
                      : "*****"}
                    <button
                      onClick={() => toggleVisibility(account.id, "balance")}
                      className="ml-3 text-gray-600 hover:text-gray-800 transition"
                    >
                      <FontAwesomeIcon
                        icon={
                          visibility[account.id]?.balance ? faEyeSlash : faEye
                        }
                      />
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleVisibility(account.id, "limits")}
                    className="text-gray-600 hover:text-gray-800 flex items-center transition"
                  >
                    {visibility[account.id]?.limits ? "Hide" : "View"}
                    <FontAwesomeIcon
                      icon={
                        visibility[account.id]?.limits
                          ? faChevronUp
                          : faChevronDown
                      }
                      className="ml-2"
                    />
                  </button>
                  {visibility[account.id]?.limits && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Min: {account.min_limit || "N/A"}</p>
                      <p>Max: {account.max_limit || "N/A"}</p>
                    </div>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDeleteAccount(account.id)}
                    className="text-red-500 hover:text-red-600 text-sm flex items-center gap-2 transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No accounts available</p>
      )}
    </div>
  );
};

export default AccountsList;
