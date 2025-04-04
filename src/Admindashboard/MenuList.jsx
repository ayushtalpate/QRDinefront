import React from "react";
import axios from "axios";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MenuList = ({ menuItems, setMenuItems, onDelete }) => {
  return (
    <div className="container mt-4">
      <h3>Menu Items</h3>
      <table className="table table-bordered table-hover text-center align-middle">
        <thead className="thead-dark">
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
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>
                {item.image ? (
                  <img
                    src={`${BACKEND_URL}/api/menu/image/${item._id}`}
                    alt={item.name}
                    width="50"
                    height="50"
                    style={{ borderRadius: "5px", objectFit: "cover" }}
                    onError={(e) =>
                      (e.target.src = "/fallback.png") // 👈 Local fallback image
                    }
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {menuItems.length === 0 && (
            <tr>
              <td colSpan="4">No menu items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MenuList;
