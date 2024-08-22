import React, { useState } from "react";
import fetchData from "../../utils/fetchData";

const RegisterAccount = ({ refreshAccounts }) => {
  const [newAccount, setNewAccount] = useState({
    name: "",
    category: "",
    min_limit: "",
    max_limit: "",
    balance: "",
    owner_id: "",
  });

  const handleAddAccount = async () => {
    try {
      await fetchData("/account", "POST", newAccount);
      setNewAccount({
        name: "",
        category: "",
        min_limit: "",
        max_limit: "",
        balance: "",
        owner_id: "",
      });
      refreshAccounts();
    } catch (err) {
      console.error(err.message || "Failed to add account.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-dark-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Create New Account
      </h2>
      <input
        type="text"
        placeholder="Account Name"
        value={newAccount.name}
        onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select
        value={newAccount.category}
        onChange={(e) =>
          setNewAccount({ ...newAccount, category: e.target.value })
        }
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Select Category</option>
        {/* map through categories here */}
      </select>
      <input
        type="number"
        placeholder="Minimum Limit"
        value={newAccount.min_limit}
        onChange={(e) =>
          setNewAccount({ ...newAccount, min_limit: e.target.value })
        }
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="number"
        placeholder="Maximum Limit"
        value={newAccount.max_limit}
        onChange={(e) =>
          setNewAccount({ ...newAccount, max_limit: e.target.value })
        }
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="number"
        placeholder="Balance"
        value={newAccount.balance}
        onChange={(e) =>
          setNewAccount({ ...newAccount, balance: e.target.value })
        }
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select
        value={newAccount.owner_id}
        onChange={(e) =>
          setNewAccount({ ...newAccount, owner_id: e.target.value })
        }
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Select Owner</option>
        {/* map through stakeholders here */}
      </select>
      <button
        onClick={handleAddAccount}
        className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Create Account
      </button>
    </div>
  );
};

export default RegisterAccount;
