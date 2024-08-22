import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function

const CreditPaymentForm = () => {
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [newPayment, setNewPayment] = useState({
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

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/credit_payment", "POST", newPayment);
      alert("Credit Payment recorded successfully!");
      setNewPayment({
        customer_id: "",
        sale_id: "",
        amount: "",
      });
    } catch (err) {
      setError(err.message || "An error occurred while recording the payment.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Record Credit Payment
      </h2>

      <form onSubmit={handleAddPayment} className="space-y-4">
        <select
          name="customer_id"
          value={newPayment.customer_id}
          onChange={(e) =>
            setNewPayment({ ...newPayment, customer_id: e.target.value })
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
          value={newPayment.sale_id}
          onChange={(e) =>
            setNewPayment({ ...newPayment, sale_id: e.target.value })
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
          value={newPayment.amount}
          onChange={(e) =>
            setNewPayment({ ...newPayment, amount: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
          required
        />

        <button
          type="submit"
          className="bg-primary text-txt-white py-2 px-4 rounded-lg hover:bg-primary-hover"
        >
          Record Payment
        </button>
      </form>
    </div>
  );
};

export default CreditPaymentForm;
