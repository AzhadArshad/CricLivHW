// src/pages/Home.jsx
// PURPOSE: Welcome page with hero + personalized section
import { Link } from "react-router-dom";
import { getUser } from "../utils/auth";
import Hero from "../components/Hero"; // ← Import Hero
// Bootstrap CSS (if not already imported in App)
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Home.css";

export default function Home() {
  const user = getUser();

  if (!user) {
    return (
      <div className="text-center mt5">
        <Hero />
        <p className="mt-4">
          <Link to="/login" className="text-pink">
            Login
          </Link>{" "}
          to book your ground
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
      <section className="welcome py-5 text-center">
        <h2 className="mb-3">
          Welcome back, <span className="text-pink">{username}</span>!
        </h2>
        <p className="text-lightgray mb-4">
          Manage your bookings or explore new grounds.
        </p>

        <div className="btn-group d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/grounds" className="btn btn-maroon btn-lg px-4 py-3">
            Browse Grounds
          </Link>

          <Link to="/my-bookings" className="btn btn-red btn-lg px-4 py-3">
            My Bookings
          </Link>

          {user.user_role === "admin" && (
            <Link to="/admin" className="btn btn-green btn-lg px-4 py-3">
              Admin Panel
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
