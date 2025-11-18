// src/components/Navbar.jsx

// PURPOSE: Display site navigation, branding, user info, login/logout
// FEATURES:
//   - Tracks logged-in user using state + effects
//   - Updates automatically when user logs in/out (even from another tab)
//   - Uses correct structure for Bootstrap navbar
//   - Renders conditional items based on user role
//   - Clean, responsive, fixed-top design

import { Link } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  // STATE: hold current user
  const [user, setUser] = useState(null);

  // load user when navbar mounts
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

  // show become admin button only if user is not an admin
  const showBecomeAdmin =
    user && user.user_role !== "admin" && user.user_role === "user";

  return (
    // navbar links and logo
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
                <Link to="/become-admin" className="nav-link text-warning">
                  Become Admin
                </Link>
              </li>
            )}
          </ul>

          {/* user info + button */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              // when user is logged in
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
              // when user is not logged in
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
