import { toast } from "react-hot-toast";
import API from "../../services/api";

export default function UserBookings({ bookings, setBookings }) {
  const handleCancel = async (id) => {
    try {
      await API.patch(`/bookings/${id}/cancel`);
      toast.success("Booking cancelled");
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === id ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (err) {
      toast.error("Failed to cancel booking");
      console.error(err);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await API.patch(`/bookings/${id}/confirm`);
      toast.success("Booking confirmed");
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === id ? { ...b, status: "confirmed" } : b
        )
      );
    } catch (err) {
      toast.error("Failed to confirm booking");
      console.error(err);
    }
  };

  if (!bookings || bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  // Format date & time
  const formatDate = (isoStr) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString(); // e.g., 11/12/2025
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "2px solid #ddd" }}>
          <th style={{ textAlign: "left", padding: "0.5rem" }}>Ground</th>
          <th style={{ textAlign: "left", padding: "0.5rem" }}>Date</th>
          <th style={{ textAlign: "left", padding: "0.5rem" }}>Time</th>
          <th style={{ textAlign: "left", padding: "0.5rem" }}>Status</th>
          <th style={{ textAlign: "left", padding: "0.5rem" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b.booking_id} style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "0.5rem" }}>{b.ground_name}</td>
            <td style={{ padding: "0.5rem" }}>{formatDate(b.booking_date)}</td>
            <td style={{ padding: "0.5rem" }}>{b.booking_time}</td>
            <td
              style={{
                padding: "0.5rem",
                color:
                  b.status === "pending"
                    ? "#ff9800"
                    : b.status === "cancelled"
                    ? "#f44336"
                    : "#28a745",
                fontWeight: "bold",
              }}
            >
              {b.status}
            </td>
            <td style={{ padding: "0.5rem" }}>
              {b.status === "pending" && (
                <>
                  <button
                    onClick={() => handleCancel(b.booking_id)}
                    style={{
                      background: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "0.5rem",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirm(b.booking_id)}
                    style={{
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Confirm
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
