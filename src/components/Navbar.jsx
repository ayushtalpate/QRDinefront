import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/qrdine.png';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "Menu", path: "/menu" },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm border-bottom sticky-top">
      <div className="container-fluid px-3 px-lg-5">

        {/* Mobile toggler on the right */}
        <Link className="navbar-brand d-flex align-items-center gap-2  d-lg-none" to="/">
                <img
                  src={logo}
                  alt="Qrdine Logo"
                  style={{ height: "50px", objectFit: "contain" }}
                />
                <span className="fw-bold fs-4 text-dark mb-0">Qrdine</span>
              </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Centered navbar content */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav align-items-center gap-lg-4 text-center">

            {/* Centered Logo & Brand */}
            <li className="nav-item d-flex align-items-center gap-2">
              <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                <img
                  src={logo}
                  alt="Qrdine Logo"
                  style={{ height: "50px", objectFit: "contain" }}
                />
                <span className="fw-bold fs-4 text-dark mb-0">Qrdine</span>
              </Link>
            </li>

            {/* Navigation Links */}
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? "active text-danger" : "text-dark"}`}
                  style={{
                    fontWeight: location.pathname === item.path ? "600" : "normal",
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Login Button */}
            <li className="nav-item mt-2 mt-lg-0">
              <Link
                to="/login"
                className="btn btn-sm btn-pill px-4 py-2"
                style={{
                  backgroundColor: "#fde5df",
                  color: "#f55540",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  borderRadius: "999px",
                }}
              >
                Log In
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
