import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loaderAnimation from "../animations/menuloader.json"; // path to your Lottie file

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const UserMenu = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [existingOrder, setExistingOrder] = useState(null);
  const [loadingOrderStatus, setLoadingOrderStatus] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true); // ✅ loading state

  useEffect(() => {
    const checkExistingOrder = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/orders`);
        const orders = res.data;

        const activeOrder = orders.find(
          (order) =>
            order.tableId === tableId &&
            (order.status === "Pending" || order.status === "Preparing")
        );

        setExistingOrder(activeOrder || null);
      } catch (err) {
        console.error("Error checking existing orders", err);
      } finally {
        setLoadingOrderStatus(false);
      }
    };

    checkExistingOrder();
  }, [tableId]);

  useEffect(() => {
    setLoadingMenu(true);
    axios
      .get(`${BACKEND_URL}/api/menu`)
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error("Error fetching menu", err))
      .finally(() => setLoadingMenu(false));
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const exists = prevCart.find((i) => i._id === item._id);
      if (exists) return prevCart;
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const increaseQty = (itemId) => {
    setCart((prev) =>
      prev.map((i) =>
        i._id === itemId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQty = (itemId) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const getItemQty = (itemId) => {
    const found = cart.find((i) => i._id === itemId);
    return found ? found.quantity : 0;
  };

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const handleOrder = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate(`/table/${tableId}/confirm`);
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4 fw-bold">
        🍽️ <span>Menu - Table {tableId}</span>
      </h4>

      {loadingMenu ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <Lottie animationData={loaderAnimation} loop style={{ height: 200 }} />
        </div>
      ) : (
        <>
          <div className="row">
            {menuItems.map((item, index) => {
              const qty = getItemQty(item._id);
              return (
                <motion.div
                  key={item._id}
                  className="col-6 col-sm-4 col-md-3 mb-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                    <img
                      src={`${BACKEND_URL}/api/menu/image/${item._id}`}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: "140px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/140";
                      }}
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title fw-bold text-dark">{item.name}</h6>
                      <p className="text-muted small mb-2">₹{item.price}</p>

                      {qty === 0 ? (
                        <button
                          className="btn btn-sm btn-outline-success px-3"
                          onClick={() => addToCart(item)}
                        >
                          ➕ Add
                        </button>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => decreaseQty(item._id)}
                          >
                            −
                          </button>
                          <span className="fw-bold">{qty}</span>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => increaseQty(item._id)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {!loadingOrderStatus && (
            <div className="text-center mt-4">
              {existingOrder ? (
                <div
                  className="alert alert-danger fw-bold mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  🚫 You already have an active order for this table. <br />
                  Please wait until it's completed.
                </div>
              ) : (
                cart.length > 0 && (
                  <button
                    className="btn btn-lg btn-success px-4 py-2 shadow-sm mt-2 rounded-3 mb-5"
                    onClick={handleOrder}
                    style={{
                      background: "linear-gradient(to right, #28a745, #218838)",
                    }}
                  >
                    Confirm Order ({getTotalItems()} item{getTotalItems() > 1 ? "s" : ""})
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserMenu;
