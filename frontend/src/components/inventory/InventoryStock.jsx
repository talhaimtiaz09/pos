import React, { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

const StockComponent = () => {
  const [stock, setStock] = useState([]);
  const [newStock, setNewStock] = useState({
    product_id: "",
    current_stock: "",
    min_limit: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStock = async () => {
      try {
        const response = await fetchData("/stock/get-all", "GET");
        setStock(response.data);
      } catch (err) {
        setError("Failed to fetch stock.");
      }
    };
    getStock();
  }, []);

  const handleCreateStock = async () => {
    try {
      await fetchData("/stock/register", "POST", newStock);
      setStock([...stock, newStock]);
      setNewStock({ product_id: "", current_stock: "", min_limit: "" });
    } catch (err) {
      setError("Failed to create stock.");
    }
  };

  return (
    <div>
      <h2>Stock</h2>
      <input
        type="number"
        placeholder="Product ID"
        value={newStock.product_id}
        onChange={(e) =>
          setNewStock({ ...newStock, product_id: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Current Stock"
        value={newStock.current_stock}
        onChange={(e) =>
          setNewStock({ ...newStock, current_stock: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Minimum Limit"
        value={newStock.min_limit}
        onChange={(e) =>
          setNewStock({ ...newStock, min_limit: e.target.value })
        }
      />
      <button onClick={handleCreateStock}>Add Stock</button>

      {error && <p>{error}</p>}
      <ul>
        {stock.map((item) => (
          <li key={item.id}>
            Product ID: {item.product_id} - Stock: {item.current_stock} - Min
            Limit: {item.min_limit || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockComponent;
