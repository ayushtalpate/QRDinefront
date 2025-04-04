import React, { useState, useEffect } from "react";
import { addMenuItem, updateMenuItem } from "../services/api";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MenuForm = ({ existingItem, onMenuUpdate }) => {
  const isEditing = !!existingItem; // Check if we are editing

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    existingImage: "",
  });

  // Populate form if editing an existing item
  useEffect(() => {
    if (existingItem) {
      setFormData({
        name: existingItem.name,
        price: existingItem.price,
        description: existingItem.description,
        existingImage: existingItem.image,
      });
    }
  }, [existingItem]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    } else if (isEditing) {
      data.append("image", formData.existingImage);
    }

    if (isEditing) {
      await updateMenuItem(existingItem._id, data);
    } else {
      await addMenuItem(data);
    }

    onMenuUpdate(); // Refresh menu list
  };

  return (
    <div className="container">
      <h2>{isEditing ? "Edit Menu Item" : "Add Menu Item"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} />
        </div>

        {isEditing && formData.existingImage && (
          <div className="mb-3">
            <label>Current Image</label><br />
            <img src={`${BACKEND_URL}/uploads/${formData.existingImage}`} width="100" alt="Current" />
          </div>
        )}

        <div className="mb-3">
          <label>{isEditing ? "New Image (Optional)" : "Image"}</label>
          <input type="file" name="image" className="form-control" accept="image/*" onChange={handleChange} />
        </div>

        <button type="submit" className={`btn ${isEditing ? "btn-primary" : "btn-success"}`}>
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
