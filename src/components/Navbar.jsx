import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom  shadow-current">
      <div className="container-fluid">
        {/* Brand Logo and Name */}
        <Link className="navbar-brand d-flex align-items-center d-lg-none" to="/">
          <FontAwesomeIcon icon={faUtensils} style={{ color: "#f55540", height: "45px" }} />
          <span className="fw-semibold ms-2 fs-3">Restoran</span>
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <Link className="navbar-brand d-flex align-items-center d-none d-lg-flex" to="/">
            <FontAwesomeIcon icon={faUtensils} style={{ color: "#f55540", height: "45px" }} />
            <span className="fw-semibold ms-2 fs-3">Restoran</span>
          </Link>

          <ul className="navbar-nav text-center">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Service", path: "/service" },
              { name: "Menu", path: "/menu" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link 
                  className={`nav-link ${location.pathname === item.path ? "active" : ""}`} 
                  to={item.path}
                  style={{
                    color: location.pathname === item.path ? "#f55540" : "inherit",
                    fontWeight: location.pathname === item.path ? "600" : "normal"
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li className="nav-item">
              <Link
                to="/login"
                className="btn rounded-pill px-4 py-2"
                style={{
                  backgroundColor: "#fde5df",
                  color: "#f55540",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "16px"
                }}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
