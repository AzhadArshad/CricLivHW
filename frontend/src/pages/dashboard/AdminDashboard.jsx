import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminGrounds from "./AdminGrounds";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [bookRes, groundRes] = await Promise.all([
        API.get("/admin/bookings"),
        API.get("/admin/grounds"),
      ]);
      setBookings(bookRes.data);
      setGrounds(groundRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  // Quick stats
  const totalBookings = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const totalGrounds = grounds.length;

  // Format date & time
  const formatDate = (isoStr) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString(); // e.g., 11/12/2025
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Admin Dashboard
      </h1>

      {/* Quick Stats */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {[
          { label: "Total Bookings", value: totalBookings, bg: "#007bff" },
          { label: "Pending", value: pending, bg: "#ff9800" },
          { label: "Confirmed", value: confirmed, bg: "#28a745" },
          { label: "Cancelled", value: cancelled, bg: "#f44336" },
          { label: "Total Grounds", value: totalGrounds, bg: "#6c757d" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: "1",
              padding: "1rem",
              borderRadius: "8px",
              background: stat.bg,
              color: "white",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "1rem" }}>{stat.label}</p>
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem" }}>Bookings</h2>
        <button
          onClick={() => navigate("/admin/groundsForm")}
          style={{
            background: "#007bff",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add New Ground
        </button>
      </div>

      {/* Bookings Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "0.5rem" }}>Booking ID</th>
            <th>Ground</th>
            <th>User</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.booking_id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>{b.booking_id}</td>
              <td>{b.ground_name}</td>
              <td>{b.booked_by}</td>
              <td>{formatDate(b.booking_date)}</td>
              <td>{b.booking_time}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminGrounds />
    </div>
  );
}
