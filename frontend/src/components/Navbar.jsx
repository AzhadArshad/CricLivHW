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

  return (
    <nav
      style={{
        background: "#343a40",
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT: Brand */}
      <div>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          CricLiv
        </Link>
      </div>

      {/* RIGHT: User Info + Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {user ? (
          <>
            {/* USER INFO */}
            <span style={{ fontSize: "0.9rem" }}>
              Hello, <strong>{user.username || user.email_id}</strong> (
              {user.user_role})
            </span>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          /* NOT LOGGED IN: Login Button */
          <Link
            to="/login"
            style={{
              background: "#007bff",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
