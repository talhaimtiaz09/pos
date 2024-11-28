import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import StatusMessage from "../popups/StatusMessage";

const RegisterAccount = () => {
  const [newAccount, setNewAccount] = useState({
    name: "",
    category: "",
    min_limit: "",
    max_limit: "",
    balance: "",
    owner_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [createResponse, setCreateResponse] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchData("/account/category", "GET");
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch categories.");
        setLoading(false);
      }
    };

    const fetchStakeholders = async () => {
      try {
        const response = await fetchData("/stakeholder", "GET");
        setStakeholders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch stakeholders.");
        setLoading(false);
      }
    };
    fetchStakeholders();

    fetchCategories();
  }, []);

  const handleAddAccount = async () => {
    try {
      console.log("newAccountbeforefetch", newAccount);
      const response = await fetchData("/account", "POST", newAccount);
      setStatus(response.message);
      setCreateResponse(response);
      setNewAccount({
        name: "",
        category: "",
        min_limit: null,
        max_limit: null,
        balance: "",
        owner_id: "",
      });
    } catch (err) {
      setStatus(response.message);
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
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {/* <input
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
      /> */}
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
        {stakeholders.map((stakeholder) => (
          <option key={stakeholder.id} value={stakeholder.id}>
            {stakeholder.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddAccount}
        className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Create Account
      </button>

      {createResponse && (
        <StatusMessage response={createResponse} status={status} />
      )}
    </div>
  );
};

export default RegisterAccount;
