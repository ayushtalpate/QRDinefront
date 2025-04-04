import React, { useState } from "react";

const AddMenuItem = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("desc", formData.desc);
    data.append("price", formData.price);
    data.append("image", formData.image);

    // Debug: Log FormData values
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      await onAdd(data); // This should be a function that posts to your backend
      alert("Menu item added successfully!");
      setFormData({ name: "", desc: "", price: "", image: null });
      document.getElementById("imageInput").value = ""; // Reset file input
    } catch (error) {
      console.error("❌ Error adding item:", error.response?.data || error.message);
      alert(`Failed to add menu item: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Menu Item</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            id="imageInput"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">Add Item</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
