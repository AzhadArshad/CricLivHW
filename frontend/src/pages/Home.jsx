// src/pages/Home.jsx
// PURPOSE: Welcome page with hero + personalized section
import { Link } from "react-router-dom";
import { getUser } from "../utils/auth";
import Hero from "../components/Hero"; // ← Import Hero

export default function Home() {
  const user = getUser();

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Hero />
        <p>
          <Link to="/login">Login</Link> to book your ground
        </p>
      </div>
    );
  }

  const username = user.username || user.email_id.split("@")[0];

  return (
    <>
      {/* HERO COMPONENT */}
      <Hero />

      {/* WELCOME SECTION */}
      <section style={{ padding: "3rem 1rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "1rem" }}>
          Welcome back, <span style={{ color: "#007bff" }}>{username}</span>!
        </h2>
        <p style={{ color: "#555", marginBottom: "2rem" }}>
          Manage your bookings or explore new grounds.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/grounds"
            style={{
              background: "#007bff",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Browse Grounds
          </Link>

          <Link
            to="/my-bookings"
            style={{
              background: "#17a2b8",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            My Bookings
          </Link>

          {user.user_role === "admin" && (
            <Link
              to="/admin"
              style={{
                background: "#dc3545",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Admin Panel
            </Link>
          )}
        </div>

        {/* DUBAI TIME */}
        <p style={{ marginTop: "3rem", color: "#777", fontSize: "0.9rem" }}>
          Current time in Dubai:{" "}
          {new Date().toLocaleString("en-AE", {
            timeZone: "Asia/Dubai",
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </section>
    </>
  );
}
