// src/components/Navbar.jsx
// PURPOSE: Show brand, user info, logout button
// FEATURES:
//   - Real-time user state with useState + useEffect
//   - Auto-updates when user logs in/out (from other tabs)
//   - Correct Link + button structure
//   - No invalid CSS (textcolor → color)

import { Link } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  // STATE: hold current user
  const [user, setUser] = useState(null);

  // LOAD USER ON MOUNT
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);

    // LISTEN FOR STORAGE CHANGES (e.g., login/logout in another tab)
    const handleStorageChange = () => {
      setUser(getUser());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Extra manual reload to refresh user details
  useEffect(() => {
    const checkUser = () => {
      const currentUser = getUser();
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    };

    // Check every 500ms (lightweight)
    const interval = setInterval(checkUser, 500);

    return () => clearInterval(interval);
  }, [user]);

  // LOGOUT HANDLER
  const handleLogout = () => {
    logout(); // Clears localStorage + redirects
  };

  const showBecomeAdmin =
    user && user.user_role !== "admin" && user.user_role === "user";

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark-custom fixed-top fs-5"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand logo">
          CricLiv
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">
                About Us
              </Link>
            </li>
            {showBecomeAdmin && (
              <li className="nav-item">
                <Link to="/contact-us" className="nav-link text-warning">
                  Contact Us
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                <span className="text-light small">
                  Hello,&nbsp;
                  <strong>{user.username || user.email_id}</strong>(
                  {user.user_role})
                </span>
                <button onClick={handleLogout} className="btn btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <span className="text-light small me-2">Hello, Guest</span>
                <Link to="/login" className="btn btn-login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
