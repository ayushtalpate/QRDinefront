import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaReceipt,
  FaQrcode,
  FaUtensils,
  FaListAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/"); // Redirect to Home or Login page
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-white shadow-sm border-end">
      <h3 className="text-center fw-bold text-danger mb-4">Admin Panel</h3>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link
            to="/admin-dashboard"
            className={`nav-link d-flex align-items-center gap-2 ${
              isActive("/admin-dashboard") ? "active bg-danger text-white" : "text-dark"
            }`}
          >
            <FaHome /> Home
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/admin-dashboard/orders"
            className={`nav-link d-flex align-items-center gap-2 ${
              isActive("/admin-dashboard/orders") ? "active bg-danger text-white" : "text-dark"
            }`}
          >
            <FaReceipt /> Order Status
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/admin-dashboard/qrcode"
            className={`nav-link d-flex align-items-center gap-2 ${
              isActive("/admin-dashboard/qrcode") ? "active bg-danger text-white" : "text-dark"
            }`}
          >
            <FaQrcode /> QR Codes
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/admin-dashboard/add-menu"
            className={`nav-link d-flex align-items-center gap-2 ${
              isActive("/admin-dashboard/add-menu") ? "active bg-danger text-white" : "text-dark"
            }`}
          >
            <FaUtensils /> Add  Item
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/admin-dashboard/menu-list"
            className={`nav-link d-flex align-items-center gap-2 ${
              isActive("/admin-dashboard/menu-list") ? "active bg-danger text-white" : "text-dark"
            }`}
          >
            <FaListAlt /> View Menu
          </Link>
        </li>
      </ul>

      <div className="mt-auto pt-3">
        <button onClick={handleLogout} className="btn btn-outline-danger w-100">
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
