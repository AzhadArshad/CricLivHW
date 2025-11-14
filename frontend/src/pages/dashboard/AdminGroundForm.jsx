// src/pages/dashboard/AdminGrounds.jsx
import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-hot-toast"; // npm install react-hot-toast
import { useNavigate } from "react-router-dom";

export default function AdminGroundForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ground_name: "",
    location: "",
    description_ground: "",
    price_per_hour: "",
    ground_photo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, ground_photo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("ground_name", form.ground_name);
    formData.append("location", form.location);
    formData.append("description_ground", form.description_ground);
    formData.append("price_per_hour", form.price_per_hour);
    if (form.ground_photo) {
      formData.append("ground_photo", form.ground_photo);
    }

    try {
      const res = await API.post("/grounds", formData);
      toast.success(`Ground added! ID: ${res.data.ground_id}`);

      // Reset form
      setForm({
        ground_name: "",
        location: "",
        description_ground: "",
        price_per_hour: "",
        ground_photo: null,
      });
      e.target.reset();

      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add ground");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Add New Ground
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <input
          name="ground_name"
          placeholder="Ground Name"
          value={form.ground_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="description_ground"
          placeholder="Description"
          value={form.description_ground}
          onChange={handleChange}
          style={{ ...inputStyle, height: "80px" }}
        />
        <input
          name="price_per_hour"
          type="number"
          placeholder="Price per hour (AED)"
          value={form.price_per_hour}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <div
          style={{
            border: "2px dashed #ccc",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: "block", margin: "0 auto" }}
          />
          {form.ground_photo && (
            <p style={{ margin: "0.5rem 0 0", color: "#5a9f68" }}>
              Selected: {form.ground_photo.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...btnStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Adding..." : "Add Ground"}
        </button>
      </form>

      {/* Toast Container */}
      <Toaster position="top-right" />
    </div>
  );
}

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};

const btnStyle = {
  background: "#5a9f68",
  color: "white",
  padding: "0.75rem",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "1.1rem",
};

// Toast Component
import { Toaster } from "react-hot-toast";
