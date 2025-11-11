import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../services/api";

export default function GroundCardAdmin({ ground, onDeleted }) {
  const imageUrl = ground.image_filename
    ? `/grounds/${ground.image_filename}`
    : "/grounds/default.jpg";

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${ground.ground_name}"?`
      )
    )
      return;

    try {
      await API.delete(`/grounds/${ground.ground_id}`);
      toast.success("Ground deleted successfully!");
      if (onDeleted) onDeleted(ground.ground_id); // notify parent to remove card
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ground. Try again later.");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <img
        src={imageUrl}
        alt={ground.ground_name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
        onError={(e) => {
          e.target.src = "/grounds/default.jpg";
        }}
      />
      <div style={{ padding: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem" }}>
          {ground.ground_name}
        </h3>
        <p style={{ margin: "0.25rem 0", color: "#555", fontSize: "0.95rem" }}>
          {ground.location}
        </p>
        <p
          style={{
            margin: "0.5rem 0",
            fontWeight: "bold",
            color: "#28a745",
            fontSize: "1.1rem",
          }}
        >
          AED {ground.price_per_hour}/hr
        </p>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
          <Link
            to={`/admin/${ground.ground_id}`}
            style={{
              flex: 1,
              background: "#007bff",
              color: "white",
              textAlign: "center",
              padding: "0.75rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            style={{
              flex: 1,
              background: "#ff0000",
              color: "white",
              textAlign: "center",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
