import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../services/api";
import { getUser } from "../utils/auth";

export default function BookingPage() {
  const { ground_id } = useParams();
  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    booking_date: "",
    booking_time: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGround = async () => {
      try {
        const res = await API.get(`/grounds/${ground_id}`);
        setGround(res.data);
      } catch (err) {
        toast.error("Failed to load ground info");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGround();
  }, [ground_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const user = getUser();
    if (!user) {
      toast.error("Please log in first");
      return;
    }

    try {
      await API.post("/bookings", {
        ground_id,
        booking_date: formData.booking_date,
        booking_time: formData.booking_time,
      });

      toast.success("Booking successful!");
      navigate("/my-bookings");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("That slot is already booked!");
      } else {
        toast.error("Booking failed. Try again later.");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <p>Loading ground info...</p>
      </div>
    );
  }

  if (!ground) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <p>Ground not found.</p>
      </div>
    );
  }

  const imageUrl = `/grounds/${ground.image_filename || "default.jpg"}`;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <img
        src={imageUrl}
        alt={ground.ground_name}
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
        onError={(e) => (e.target.src = "/grounds/default.jpg")}
      />

      <h1 style={{ marginTop: "1.5rem", fontSize: "2rem" }}>
        {ground.ground_name}
      </h1>
      <p style={{ color: "#666", marginBottom: "0.5rem" }}>
        📍 {ground.location}
      </p>
      <p style={{ margin: "0.5rem 0", color: "#333" }}>
        {ground.description_ground}
      </p>
      <p
        style={{
          fontWeight: "bold",
          color: "#28a745",
          fontSize: "1.2rem",
          marginTop: "1rem",
        }}
      >
        AED {ground.price_per_hour}/hr
      </p>

      <button
        style={{
          background: "#007bff",
          color: "white",
          padding: "0.8rem 1.2rem",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
        onClick={() => setShowForm(true)}
      >
        Book Now
      </button>

      {/* POPUP FORM */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowForm(false)}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "400px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
              Book {ground.ground_name}
            </h2>
            <form onSubmit={handleBooking}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Date:
              </label>
              <input
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                }}
              />

              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Time:
              </label>
              <select
                name="booking_time"
                value={formData.booking_time}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <option value="">Select time</option>
                {Array.from({ length: 13 }, (_, i) => 8 + i).map((hour) => {
                  const hourStr = hour.toString().padStart(2, "0") + ":00";
                  return (
                    <option key={hourStr} value={hourStr}>
                      {hourStr}
                    </option>
                  );
                })}
              </select>

              <button
                type="submit"
                style={{
                  background: "#28a745",
                  color: "white",
                  width: "100%",
                  padding: "0.8rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
