import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MenuList = ({ menuItems, setMenuItems, onDelete }) => {
  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-danger fw-bold">Menu Items</h3>

      <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table table-striped table-hover table-bordered align-middle text-center">
          <thead className="table-dark sticky-top">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {menuItems.map((item) => (
              <tr key={item._id}>
                <td className="fw-semibold">{item.name}</td>
                <td className="text-success fw-semibold">₹{item.price}</td>
                <td>
                  {item.image ? (
                    <img
                      src={`${BACKEND_URL}/api/menu/image/${item._id}`}
                      alt={item.name}
                      width="50"
                      height="50"
                      className="rounded shadow-sm"
                      style={{ objectFit: "cover" }}
                      onError={(e) => (e.target.src = "/fallback.png")}
                    />
                  ) : (
                    <span className="text-muted">No Image</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger d-flex align-items-center justify-content-center mx-auto"
                    onClick={() => onDelete(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {menuItems.length === 0 && (
              <tr>
                <td colSpan="4" className="text-muted py-3">
                  No menu items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuList;
