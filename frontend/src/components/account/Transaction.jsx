import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData"; // Adjust this path to your fetchData utility
import formatCurrency from "../utils/formatCurrency";
import TransactionLog from "./TransactionLog";

const Transactions = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactionData, setTransactionData] = useState({
    from_account_id: "",
    to_account_id: "",
    amount: "",
    transaction_type: "TRANSFER",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetchData("account", "GET");
        setAccounts(response.data || []);
      } catch (err) {
        setError("Failed to fetch accounts.");
      }
    };

    fetchAccounts();
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validations
    const fromAccount = accounts.find(
      (account) => account.id === parseInt(transactionData.from_account_id)
    );

    if (transactionData.transaction_type === "TRANSFER") {
      const toAccount = accounts.find(
        (account) => account.id === parseInt(transactionData.to_account_id)
      );

      if (!fromAccount || !toAccount) {
        setError("Please select valid accounts.");
        return;
      }

      if (fromAccount.id === toAccount.id) {
        setError("From and to accounts must be different for transfers.");
        return;
      }

      if (transactionData.amount <= 0) {
        setError("Amount must be greater than 0.");
        return;
      }

      if (fromAccount.balance < transactionData.amount) {
        setError("Insufficient balance.");
        return;
      }
    } else {
      if (!fromAccount) {
        setError("Please select a valid account.");
        return;
      }

      if (transactionData.amount <= 0) {
        setError("Amount must be greater than 0.");
        return;
      }

      if (
        transactionData.transaction_type === "WITHDRAWAL" &&
        parseInt(fromAccount.balance) < parseInt(transactionData.amount)
      ) {
        console.log("fromAccount.balance", fromAccount.balance);
        setError("Insufficient balance.");
        return;
      }

      if (
        transactionData.transaction_type === "DEPOSIT" &&
        fromAccount.max_limit &&
        fromAccount.balance + parseFloat(transactionData.amount) >
          fromAccount.max_limit
      ) {
        setError("Deposit exceeds account limit.");
        return;
      }

      if (
        transactionData.transaction_type === "WITHDRAWAL" &&
        fromAccount.min_limit &&
        fromAccount.balance - parseFloat(transactionData.amount) <
          fromAccount.min_limit
      ) {
        setError("Withdrawal goes below account minimum limit.");
        return;
      }

      // For DEPOSIT and WITHDRAWAL, set `to_account_id` same as `from_account_id`
      transactionData.to_account_id = transactionData.from_account_id;
    }

    try {
      await fetchData("account/transaction", "POST", transactionData);
      setSuccess("Transaction successful.");
      // Update the local account balance
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === fromAccount.id
            ? {
                ...acc,
                balance:
                  transactionData.transaction_type === "WITHDRAWAL"
                    ? acc.balance - parseFloat(transactionData.amount)
                    : acc.balance + parseFloat(transactionData.amount),
              }
            : acc
        )
      );
      setTransactionData({
        from_account_id: "",
        to_account_id: "",
        amount: "",
        transaction_type: "TRANSFER",
      });
    } catch (err) {
      setError(
        err.message || "An error occurred while processing the transaction."
      );
    }
  };

  return (
    <div>
      <div className="transaction-form p-4 bg-ice-white rounded-md m-10">
        <h2 className="text-primary font-bold text-2xl">Transactions</h2>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <form onSubmit={handleTransaction}>
          <div className="flex flex-col my-4">
            <label className="font-semibold">Transaction Type</label>
            <select
              className="p-2 border rounded-md"
              value={transactionData.transaction_type}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  transaction_type: e.target.value,
                })
              }
            >
              <option value="TRANSFER">Transfer</option>
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
            </select>
          </div>
          <div className="flex flex-col my-4">
            <label className="font-semibold">
              {transactionData.transaction_type === "TRANSFER"
                ? "From Account"
                : "Account"}
            </label>
            <select
              className="p-2 border rounded-md"
              value={transactionData.from_account_id}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  from_account_id: e.target.value,
                })
              }
            >
              <option value="">Select Account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} (Balance: {formatCurrency(account.balance)})
                </option>
              ))}
            </select>
          </div>
          {transactionData.transaction_type === "TRANSFER" && (
            <div className="flex flex-col my-4">
              <label className="font-semibold">To Account</label>
              <select
                className="p-2 border rounded-md"
                value={transactionData.to_account_id}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    to_account_id: e.target.value,
                  })
                }
              >
                <option value="">Select Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} (Balance: {formatCurrency(account.balance)})
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col my-4">
            <label className="font-semibold">Amount</label>
            <input
              type="number"
              className="p-2 border rounded-md"
              value={transactionData.amount}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  amount: e.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white rounded-md py-2 px-4 mt-4 hover:bg-primary-hover active:translate-y-1 duration-300"
          >
            Submit Transaction
          </button>
        </form>
      </div>
      <div className="m-10">
        <TransactionLog accounts={accounts} />
      </div>
    </div>
  );
};

export default Transactions;
