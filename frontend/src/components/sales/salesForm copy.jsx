import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function
import SearchBar from "../utils/SearchBar";

const SalesForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const [batches, setBatches] = useState([]); // State for batches
  const [newSale, setNewSale] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
    account_id: "",
    price: "",
    stakeholder_id: "",
    batch_id: "", // Add batch_id field
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const customerResponse = await fetchData("customer", "GET");
        const productResponse = await fetchData("product", "GET");
        const accountResponse = await fetchData("account", "GET");
        const stakeholderResponse = await fetchData("stakeholder", "GET");
        const batchResponse = await fetchData("inventory/batch", "GET"); // Adjust the endpoint for batches

        setCustomers(customerResponse.data || []);
        setProducts(productResponse.data || []);
        setAccounts(accountResponse.data || []);
        setStakeholders(stakeholderResponse.data || []);
        setBatches(batchResponse.data || []); // Set batches
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleAddSale = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/sales", "POST", newSale);
      alert("Sale added successfully!");
      setNewSale({
        customer_id: "",
        product_id: "",
        quantity: "",
        account_id: "",
        price: "",
        stakeholder_id: "",
        batch_id: "", // Reset batch_id
      });
    } catch (err) {
      setError(err.message || "An error occurred while adding the sale.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // <div className="w-2/3 mx-auto my-10 text-txt-white">
    //   <h2 className="text-2xl font-bold mb-6 text-primary">Add Sale</h2>

    //   <form onSubmit={handleAddSale} className="space-y-4">
    //     <select
    //       name="customer_id"
    //       value={newSale.customer_id}
    //       onChange={(e) =>
    //         setNewSale({ ...newSale, customer_id: e.target.value })
    //       }
    //       className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
    //       required
    //     >
    //       <option value="">Select Customer</option>
    //       {customers.map((customer) => (
    //         <option key={customer.id} value={customer.id}>
    //           {customer.name}
    //         </option>
    //       ))}
    //     </select>

    //     <select
    //       name="product_id"
    //       value={newSale.product_id}
    //       onChange={(e) =>
    //         setNewSale({ ...newSale, product_id: e.target.value })
    //       }
    //       className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
    //       required
    //     >
    //       <option value="">Select Product</option>
    //       {products.map((product) => (
    //         <option key={product.id} value={product.id}>
    //           {product.name}
    //         </option>
    //       ))}
    //     </select>

    //     <input
    //       type="number"
    //       name="quantity"
    //       placeholder="Quantity"
    //       value={newSale.quantity}
    //       onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
    //       className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
    //       required
    //     />

    //     <input
    //       type="number"
    //       name="price"
    //       placeholder="Price"
    //       value={newSale.price}
    //       onChange={(e) => setNewSale({ ...newSale, price: e.target.value })}
    //       className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
    //       required
    //     />

    //     <select
    //       name="account_id"
    //       value={newSale.account_id}
    //       onChange={(e) =>
    //         setNewSale({ ...newSale, account_id: e.target.value })
    //       }
    //       className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
    //       required
    //     >
    //       <option value="">Select Account</option>
    //       {accounts.map((account) => (
    //         <option key={account.id} value={account.id}>
    //           {account.name}
    //         </option>
    //       ))}
    //     </select>

    //     <select
    //       name="stakeholder_id"
    //       value={newSale.stakeholder_id}
    //       onChange={(e) =>
    //         setNewSale({ ...newSale, stakeholder_id: e.target.value })
    //       }
    //       className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
    //       required
    //     >
    //       <option value="">Select Stakeholder</option>
    //       {stakeholders
    //         .filter((st) => st.category_name == "OWNER")
    //         .map((stakeholder) => (
    //           <option key={stakeholder.id} value={stakeholder.id}>
    //             {stakeholder.name}
    //           </option>
    //         ))}
    //     </select>

    //     {/* Add batch_id dropdown */}
    //     <select
    //       name="batch_id"
    //       value={newSale.batch_id}
    //       onChange={(e) => setNewSale({ ...newSale, batch_id: e.target.value })}
    //       className="w-full px-3 py-2 border rounded-lg bg-transparent border-2 border-slate-400"
    //       required
    //     >
    //       <option value="">Select Batch</option>
    //       {batches
    //         .filter((el) => {
    //           return el.product_id == newSale.product_id;
    //           console.log(el.product_id, newSale.product_id);
    //         })
    //         .map((batch) => (
    //           <option key={batch.id} value={batch.id}>
    //             {batch.id} {batch.location_name} {batch.purchase_price}
    //             {" qty:"}
    //             {batch.quantity}
    //             {/* Adjust to display a more meaningful batch label if needed */}
    //           </option>
    //         ))}
    //     </select>

    //     <button
    //       type="submit"
    //       className="bg-primary text-txt-white py-2 px-4 rounded-lg hover:bg-primary-hover"
    //     >
    //       Add Sale
    //     </button>

    //     <SearchBar data={batches} searchBy={"inventory_name"} />
    //   </form>
    // </div>

    <div className="w-2/3 mx-10 my-10">
      <div className="bg-ice-white p-4 rounded-md">
        <h1 className="text-primary font-bold text-2xl">Sales Entry</h1>
      </div>
    </div>
  );
};

export default SalesForm;
