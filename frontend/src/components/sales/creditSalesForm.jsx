import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function

const CreditSalesForm = () => {
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [newCreditSale, setNewCreditSale] = useState({
    customer_id: "",
    sale_id: "",
    amount: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const customerResponse = await fetchData("customer", "GET");
        const saleResponse = await fetchData("sales", "GET");

        setCustomers(customerResponse.data || []);
        setSales(saleResponse.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleAddCreditSale = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/credit_sales", "POST", newCreditSale);
      alert("Credit Sale recorded successfully!");
      setNewCreditSale({
        customer_id: "",
        sale_id: "",
        amount: "",
      });
    } catch (err) {
      setError(err.message || "An error occurred while recording credit sale.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-black">Record Credit Sale</h2>

      <form onSubmit={handleAddCreditSale} className="space-y-4">
        <select
          name="customer_id"
          value={newCreditSale.customer_id}
          onChange={(e) =>
            setNewCreditSale({ ...newCreditSale, customer_id: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <select
          name="sale_id"
          value={newCreditSale.sale_id}
          onChange={(e) =>
            setNewCreditSale({ ...newCreditSale, sale_id: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        >
          <option value="">Select Sale</option>
          {sales.map((sale) => (
            <option key={sale.id} value={sale.id}>
              {sale.id} - {sale.product_id} - {sale.quantity}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newCreditSale.amount}
          onChange={(e) =>
            setNewCreditSale({ ...newCreditSale, amount: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        />

        <button
          type="submit"
          className="bg-primary text-txt-white py-2 px-4 rounded-lg hover:bg-primary-hover"
        >
          Record Credit Sale
        </button>
      </form>
    </div>
  );
};

export default CreditSalesForm;
