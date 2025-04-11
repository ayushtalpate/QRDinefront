import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../animations/placedoeder.json"; // Make sure the path is correct

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const OrderConfirm = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [paymentMethod, setPaymentMethod] = useState("payLater");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSubmit = async () => {
    if (paymentMethod === "online") {
      try {
        const orderRes = await fetch(`${BACKEND_URL}/api/razorpay/order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: calculateTotal() * 100 }),
        });

        const orderData = await orderRes.json();

        const options = {
          key: "rzp_test_QQHn9K2KaeTnxh", // Replace with your key
          amount: orderData.amount,
          currency: "INR",
          name: "QR Dine",
          description: "Order Payment",
          order_id: orderData.id,
          handler: async function (response) {
            const confirmRes = await fetch(`${BACKEND_URL}/api/orders`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                tableId,
                items: cart,
                paymentMethod: "online",
                paymentDetails: response,
              }),
            });

            if (confirmRes.ok) {
              setOrderSuccess(true);
              setTimeout(() => {
                localStorage.removeItem("cart");
                navigate(`/table/${tableId}`);
              }, 3000);
            } else {
              alert("❌ Order creation failed after payment.");
            }
          },
          prefill: {
            name: "Customer",
            email: "test@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#f55540",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment error:", error);
        alert("❌ Payment failed.");
      }
    } else {
      try {
        const response = await fetch(`${BACKEND_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableId,
            items: cart,
            paymentMethod: "payLater",
          }),
        });

        if (response.ok) {
          setOrderSuccess(true);
          setTimeout(() => {
            localStorage.removeItem("cart");
            navigate(`/table/${tableId}`);
          }, 3000);
        } else {
          const errorData = await response.json();
          alert(`❌ Failed to place order: ${errorData.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Order error:", error);
        alert("❌ Network error while placing order.");
      }
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (orderSuccess) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          <Lottie animationData={successAnimation} style={{ width: 300, height: 300 }} loop={false} />
          <h5 className="mt-3 text-success fw-bold">Order Placed Successfully!</h5>
          <p className="text-muted">Redirecting to menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-4 text-center fw-bold">
        🛒 Confirm Your Order <span className="text-primary">(Table {tableId})</span>
      </h4>

      {cart.length === 0 ? (
        <p className="text-center text-danger fw-bold">⚠️ No items in cart.</p>
      ) : (
        <div className="card shadow-sm p-4 border-0 rounded-4">
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 border-bottom"
                key={index}
              >
                <div>
                  <strong className="text-dark">{item.name}</strong>
                  <br />
                  <small className="text-muted">
                    ₹{item.price} × {item.quantity}
                  </small>
                </div>
                <span className="fw-bold text-success">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded-3 mb-3">
            <strong className="fs-5 text-dark">Total Amount:</strong>
            <strong className="fs-5 text-primary">₹{calculateTotal()}</strong>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">💳 Payment Method:</label>
            <select
              className="form-select shadow-sm"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="payLater">💵 Pay After (Cash)</option>
              <option value="online">💳 Pay Now (Online)</option>
            </select>
          </div>

          <button
            className="btn btn-lg w-100 fw-bold text-white"
            onClick={handleSubmit}
            style={{
              background: "linear-gradient(to right, #28a745, #218838)",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            ✅ Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderConfirm;
