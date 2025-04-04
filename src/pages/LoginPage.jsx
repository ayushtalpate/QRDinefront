import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "12345") {
      navigate("/admin-dashboard"); // Redirect to Admin Dashboard
    } else {
      setError("❌ Invalid Username or Password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#fde5df" }}>
      <div className="p-5 rounded shadow-lg bg-white" style={{ width: "350px" }}>
        <h2 className="text-center mb-4" style={{ color: "#f55540" }}>Admin Login</h2>
        
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input 
              type="text" 
              name="username" 
              className="form-control border-danger"
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-control border-danger"
              onChange={handleChange} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn w-100 fw-bold" 
            style={{ backgroundColor: "#f55540", color: "#fff" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
