import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../services/api";

export default function AdminEdit() {
  const { ground_id } = useParams();
  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    ground_name: "",
    location: "",
    description_ground: "",
    price_per_hour: "",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGround = async () => {
      try {
        const res = await API.get(`/grounds/${ground_id}`);
        setGround(res.data);
        setFormData({
          ground_name: res.data.ground_name,
          location: res.data.location,
          description_ground: res.data.description_ground,
          price_per_hour: res.data.price_per_hour,
        });
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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Send JSON directly
      await API.put(`/grounds/${ground_id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Ground updated successfully!");
      navigate("/admin");
    } catch (err) {
      toast.error("Failed to update ground. Try again later.");
      console.error(err);
    } finally {
      setSaving(false);
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

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Edit Ground</h1>

      <form onSubmit={handleSave}>
        <label>Name:</label>
        <input
          type="text"
          name="ground_name"
          value={formData.ground_name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <label>Description:</label>
        <textarea
          name="description_ground"
          value={formData.description_ground}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <label>Price per hour (AED):</label>
        <input
          type="number"
          name="price_per_hour"
          value={formData.price_per_hour}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            background: saving ? "#94d3a2" : "#007bff",
            color: "white",
            width: "100%",
            padding: "0.8rem",
            border: "none",
            borderRadius: "6px",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
