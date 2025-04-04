import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => fetchOrders(), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id, status) => {
    await axios.put(`${BACKEND_URL}/api/orders/${id}`, { status });
    setOrders((prev) =>
      prev.map((order) => (order._id === id ? { ...order, status } : order))
    );
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BACKEND_URL}/api/orders/${id}`);
    setOrders((prev) => prev.filter((order) => order._id !== id));
  };

  const handlePrint = (order) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<h3>🧾 Bill for Table ${order.tableId}</h3>`);
    order.items.forEach((item) => {
      printWindow.document.write(
        `<p>${item.name} × ${item.quantity} = ₹${item.price * item.quantity}</p>`
      );
    });
    printWindow.document.write(
      `<hr><strong>Total: ₹${order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )}</strong>`
    );
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-center mb-4">📜 All Orders</h3>
      <div className="table-responsive">
        <table className="table table-hover table-bordered shadow-sm rounded">
          <thead className="table-dark">
            <tr>
              <th className="text-center">Table ID</th>
              <th>Items</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="text-center fw-bold">🍽️ Table {order.tableId}</td>
                <td>
                  <ul className="mb-0">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.name}</strong> × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="text-center">
                  <span
                    className={`badge ${
                      order.status === "Pending"
                        ? "bg-warning text-dark"
                        : order.status === "Served"
                        ? "bg-info"
                        : "bg-success"
                    } p-2`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleStatusChange(order._id, "Served")}
                  >
                    ✅ Mark Served
                  </button>
                  <button
                    className="btn btn-sm btn-warning text-dark me-2"
                    onClick={() => handleStatusChange(order._id, "Payment Completed")}
                  >
                    💰 Payment Done
                  </button>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handlePrint(order)}
                  >
                    🖨️ Print Bill
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(order._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderList;
