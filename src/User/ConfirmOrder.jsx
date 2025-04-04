import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ConfirmOrder = () => {
  const { tableId } = useParams();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const placeOrder = async () => {
    try {
      await axios.post("http://localhost:5001/api/orders", {
        tableId,
        items: cart,
        status: "Pending",
        createdAt: new Date()
      });
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
    } catch (err) {
      alert("Failed to place order");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Confirm Your Order (Table {tableId})</h2>
      <ul className="list-group">
        {cart.map((item, index) => (
          <li key={index} className="list-group-item">{item.name} - ₹{item.price}</li>
        ))}
      </ul>
      <button className="btn btn-success mt-3" onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default ConfirmOrder;
