import { useEffect, useState } from "react";
import UserBookings from "./UserBookings";
import API from "../../services/api";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Quick stats derived from bookings state
  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;

  if (loading) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Dashboard</h1>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1",
            padding: "1rem",
            borderRadius: "8px",
            background: "#007bff",
            color: "white",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "1rem" }}>Total Bookings</p>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            {total}
          </p>
        </div>
        <div
          style={{
            flex: "1",
            padding: "1rem",
            borderRadius: "8px",
            background: "#ff9800",
            color: "white",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "1rem" }}>Pending</p>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            {pending}
          </p>
        </div>
        <div
          style={{
            flex: "1",
            padding: "1rem",
            borderRadius: "8px",
            background: "#28a745",
            color: "white",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "1rem" }}>Confirmed</p>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            {confirmed}
          </p>
        </div>
        <div
          style={{
            flex: "1",
            padding: "1rem",
            borderRadius: "8px",
            background: "#f44336",
            color: "white",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "1rem" }}>Cancelled</p>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            {cancelled}
          </p>
        </div>
      </div>

      <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>My Bookings</h2>
      <UserBookings bookings={bookings} setBookings={setBookings} />
    </div>
  );
}
