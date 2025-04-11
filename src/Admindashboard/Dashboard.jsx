import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import QRCodePrinter from "./QRCodePrinter";
import AdminHomePage from "./AdminHomePage";
import Orders from "./Orders";
import MenuList from "./MenuList";
import AddMenuItem from "./AddMenuItem";
import AdminOrderList from "./AdminOrderList";
import DailyRevenueReport from "./DailyRevenueReport";

// ✅ Environment URLs
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("❌ Error fetching menu items:", error);
    }
  };

  const addItem = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/menu`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Success:", response.data);
      alert("Item added successfully!");
      setMenuItems((prevMenu) => [...prevMenu, response.data.newItem]);
    } catch (error) {
      console.error("❌ Error adding item:", error.response?.data || error.message);
      alert(`Failed to add menu item: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid ID");
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/api/menu/${id}`);
      console.log("✅ Item deleted:", id);
      alert("Item deleted successfully!");
      setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("❌ Error deleting item:", error);
      alert("Failed to delete item!");
    }
  };

  return (
    <div className={`container-fluid vh-100 ${darkMode ? "bg-dark text-white" : "bg-light"}`}>
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-md-2 bg-light border-end min-vh-100 d-flex flex-column">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 d-flex flex-column">

          <div className="flex-grow-1 p-4">
            <Routes>
              <Route path="/" element={<AdminHomePage />} />
              <Route path="admin-dashboard" element={<AdminHomePage />} />
              <Route path="qrcode" element={<QRCodePrinter />} />
              <Route path="orders" element={<AdminOrderList />} />
              <Route path="add-menu" element={<AddMenuItem onAdd={addItem} />} />
              <Route
                path="/menu-list"
                element={<MenuList menuItems={menuItems} setMenuItems={setMenuItems} onDelete={handleDelete} />}
              />
              <Route path="revenue-report" element={<DailyRevenueReport />} />


            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
