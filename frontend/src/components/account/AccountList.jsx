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

// Function to format balance into Pakistani currency
const formatCurrency = (amount) => {
  if (amount == null || amount === "") return "N/A";

  // Convert to number
  const num = parseFloat(amount);

  // Check for NaN
  if (isNaN(num)) return "N/A";

  // Convert to Pakistani currency format
  const lac = Math.floor(num / 100000);
  const rupees = num % 100000;

  return (
    <div className="my-4">
      {lac > 0 && <div className="text-4xl">{lac.toLocaleString()} lac</div>}
      {rupees > 0 && (
        <div className="text-2xl">{rupees.toLocaleString()} rupees</div>
      )}
    </div>
  );
};

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const [balanceVisibility, setBalanceVisibility] = useState({});
  const [limitsVisibility, setLimitsVisibility] = useState({});
  const [trashVisibility, setTrashVisibility] = useState({});

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetchData("/account", "GET");
        setAccounts(response.data);
        setBalanceVisibility(
          response.data.reduce((acc, account) => {
            acc[account.id] = false; // Initialize all balances as hidden
            return acc;
          }, {})
        );
        setLimitsVisibility(
          response.data.reduce((acc, account) => {
            acc[account.id] = false; // Initialize all limits as hidden
            return acc;
          }, {})
        );
        setTrashVisibility(
          response.data.reduce((acc, account) => {
            acc[account.id] = false; // Initialize all trash icons as hidden
            return acc;
          }, {})
        );
      } catch (err) {
        console.error(err.message || "Failed to fetch accounts.");
      }
    };

    fetchAccounts();
  }, []);

  const toggleBalanceVisibility = (id) => {
    setBalanceVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleLimitsVisibility = (id) => {
    setLimitsVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleTrashVisibility = (id) => {
    setTrashVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteAccount = async (id) => {
    try {
      await fetchData(`/account/${id}`, "DELETE");
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== id)
      );
    } catch (err) {
      console.error(err.message || "Failed to delete account.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Accounts List</h2>
      <div className="flex flex-wrap gap-8">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white w-full p-6 rounded-lg shadow-md relative border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-semibold text-gray-800">
                  {balanceVisibility[account.id] ? (
                    formatCurrency(account.balance)
                  ) : (
                    <span className="tracking-widest text-gray-400">*****</span>
                  )}
                </div>
                <button
                  onClick={() => toggleBalanceVisibility(account.id)}
                  className="text-primary hover:text-primary-hover transition"
                >
                  <FontAwesomeIcon
                    icon={balanceVisibility[account.id] ? faEyeSlash : faEye}
                    size="lg"
                  />
                </button>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {account.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {account.owner_name || "N/A"}
                  </p>
                  <p className="text-primary mb-4">{account.category_name}</p>
                </div>
                <div>
                  <button
                    onClick={() => toggleLimitsVisibility(account.id)}
                    className="flex items-center text-gray-500 hover:text-gray-600 transition mb-4 "
                  >
                    <span className="mr-2">Limits</span>
                    <FontAwesomeIcon
                      icon={
                        limitsVisibility[account.id]
                          ? faChevronUp
                          : faChevronDown
                      }
                      size="sm"
                    />
                  </button>
                  {limitsVisibility[account.id] && (
                    <div>
                      <p className="text-gray-600 mb-4">
                        Min: {account.min_limit || "N/A"}
                      </p>
                      <p className="text-gray-600 mb-4">
                        Max: {account.max_limit || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute bottom-6 right-6 flex space-x-3">
                <button
                  onClick={() => toggleTrashVisibility(account.id)}
                  className={`text-red-500 hover:text-red-600 transition ${
                    trashVisibility[account.id] ? "block" : "hidden"
                  }`}
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
                {trashVisibility[account.id] && (
                  <button
                    onClick={() => handleDeleteAccount(account.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No accounts available</p>
        )}
      </div>
    </div>
  );
};

export default AccountsList;
