import React, { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData"; // Adjust the path to your fetchData function
import SearchBar from "../utils/SearchBar";
import RangeInput from "../utils/RangeInput";
import NumberInput from "../utils/NumberInput";
// import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";

const SalesForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const [batches, setBatches] = useState([]);
  const [newSale, setNewSale] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
    account_id: "",
    price: "",
    stakeholder_id: "",
    batch_id: "",
  });

  const [availableQty, setAvailableQty] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  const [customerType, setCustomerType] = useState("walking");
  const [paymentType, setPaymentType] = useState("cash");
  const [salesType, setSalesType] = useState("regular");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const customerResponse = await fetchData("customer", "GET");
        const productResponse = await fetchData("product", "GET");
        const accountResponse = await fetchData("account", "GET");
        const stakeholderResponse = await fetchData("stakeholder", "GET");
        const batchResponse = await fetchData("inventory/batch", "GET");

        setCustomers(customerResponse.data || []);
        setProducts(productResponse.data || []);
        setAccounts(accountResponse.data || []);
        setStakeholders(stakeholderResponse.data || []);
        setBatches(batchResponse.data || []);
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
        batch_id: "",
      });
    } catch (err) {
      setError(err.message || "An error occurred while adding the sale.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-2/3 mx-10 my-10">
      <div className="bg-ice-white p-4 rounded-md">
        <h1 className="text-primary font-bold text-2xl">Sales Entry</h1>
      </div>
      <div className="flex gap-x-8 my-4 font-semibold">
        <div
          onClick={() => {
            setCustomerType(
              customerType === "walking" ? "registered" : "walking"
            );
          }}
          className="flex rounded-md overflow-hidden active:translate-y-2 duration-300 hover:-translate-y-1"
        >
          <button
            className={`px-4 py-3 ${
              customerType === "walking"
                ? "bg-primary text-txt-white"
                : "bg-gray-300"
            }`}
          >
            Walking
          </button>
          <button
            className={`px-4 py-3 ${
              customerType === "registered"
                ? "bg-primary text-txt-white"
                : "bg-gray-300"
            }`}
          >
            Registered
          </button>
        </div>
        <div
          onClick={() => {
            setSalesType(salesType === "regular" ? "credit" : "regular");
          }}
          className="flex rounded-md overflow-hidden active:translate-y-2 duration-300 hover:-translate-y-1"
        >
          <button
            className={`px-4 py-3 ${
              salesType === "regular"
                ? "bg-primary text-txt-white"
                : "bg-gray-300"
            }`}
          >
            Regular
          </button>
          <button
            className={`px-4 py-3 ${
              salesType === "credit"
                ? "bg-primary text-txt-white"
                : "bg-gray-300"
            }`}
          >
            Credit
          </button>
        </div>
        <div
          onClick={() => {
            setPaymentType(paymentType === "cash" ? "bank" : "cash");
          }}
          className="flex rounded-md overflow-hidden active:translate-y-2 duration-300 hover:-translate-y-1"
        >
          <button
            className={`px-4 py-3 ${
              paymentType === "cash"
                ? "bg-primary text-txt-white"
                : "bg-gray-300"
            }`}
          >
            Cash
          </button>
          <button
            className={`px-4 py-3 ${
              paymentType === "bank"
                ? "bg-primary text-txt-white"
                : "bg-gray-300"
            }`}
          >
            Bank
          </button>
        </div>
      </div>
      <div className="text-txt-white my-6">
        <div>
          <p className="mt-4 my-2 font-semibold text-lg ">Select Product</p>
          <SearchBar
            data={products}
            searchBy={"name"}
            onSelect={(selectedProduct) =>
              setNewSale({ ...newSale, product_id: selectedProduct.id })
            }
          />
        </div>
        <div>
          <p className="mt-4 my-2 font-semibold text-lg">Select Batch</p>
          <select
            className="border p-3 rounded-md w-full bg-transparent border-2 border-slate-200"
            value={newSale.batch_id}
            onChange={(e) => {
              setNewSale({ ...newSale, batch_id: e.target.value });
              const selectedBatch = e.target.value;
              setAvailableQty(
                batches.filter((b) => b.id == selectedBatch)[0].quantity
              );
              setPurchasePrice(
                batches.filter((b) => b.id == selectedBatch)[0].purchase_price
              );
            }}
          >
            <option value="">Select Batch</option>
            {batches
              .filter((el) => el.product_id === newSale.product_id)
              .map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.location_name} PP: (Rs.{batch.purchase_price}) Qty:{" "}
                  {batch.quantity}
                </option>
              ))}
          </select>
        </div>

        <div className="flex gap-x-16 my-2">
          <div>
            <p className="mt-4 my-2 font-semibold text-lg">Quantity</p>
            <NumberInput
              initialValue={0}
              placeholder={`Qty Stock : ${availableQty}`}
              onChange={(value) => setNewSale({ ...newSale, quantity: value })}
            />
          </div>
          <div>
            {!purchasePrice && (
              <p className="mt-4 my-2 font-semibold text-lg ">Price</p>
            )}

            {purchasePrice && (
              <>
                {newSale.price > purchasePrice ? (
                  <p className="mt-4 my-2 font-semibold text-lg text-green-500 ">
                    Profit ++
                  </p>
                ) : (
                  <p className="mt-4 my-2 font-semibold text-lg text-red-500">
                    Loss --
                  </p>
                )}
              </>
            )}

            <NumberInput
              placeholder={`Purchase : ${purchasePrice}`}
              initialValue={purchasePrice}
              onChange={(value) => setNewSale({ ...newSale, price: value })}
            />
          </div>
        </div>
        {customerType === "registered" && (
          <div>
            <p className="mt-4 my-2 font-semibold text-lg">Select Customer</p>
            <SearchBar
              data={customers}
              searchBy={"name"}
              onSelect={(selectedCustomer) =>
                setNewSale({ ...newSale, customer_id: selectedCustomer.id })
              }
            />
          </div>
        )}
        {paymentType === "bank" && (
          <div>
            <p className="mt-4 my-2 font-semibold text-lg">Select Account</p>
            <SearchBar
              data={accounts}
              searchBy={"name"}
              onSelect={(selectedAccount) =>
                setNewSale({ ...newSale, account_id: selectedAccount.id })
              }
            />
          </div>
        )}
      </div>
      <button
        onClick={handleAddSale}
        className="bg-primary rounded-md py-2 px-4 hover:bg-primary-hover active:translate-y-2 duration-300 hover:-translate-y-1"
      >
        <p className="text-txt-white">
          {salesType === "credit" ? "Credit Sale" : "Add Sale"}
        </p>
      </button>
    </div>
  );
};

export default SalesForm;
