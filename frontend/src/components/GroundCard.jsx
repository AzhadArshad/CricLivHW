// src/components/GroundCard.jsx
import { Link } from "react-router-dom";
import "./Hero.css";

// recieves "ground" component as a prop
export default function GroundCard({ ground }) {
  // Determine which image to display,
  // If the ground has an image filename, use it.
  // Otherwise, fall back to a default placeholder image.
  const imageUrl = ground.image_filename
    ? `/grounds/${ground.image_filename}`
    : "/grounds/default.jpg";

  return (
    <div
      className="card h-100 bg-green-dark text-white border-0 shadow-lg rounded-3 overflow-hidden"
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* ground thumbnail image */}
      <img
        src={imageUrl}
        alt={ground.ground_name}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
        onError={(e) => {
          e.target.src = "/grounds/default.jpg";
        }}
      />

      {/* card body section */}
      <div
        className="card-cody d-flex flex-column p-3 flex-grow-1"
        style={{ minHeight: "160px" }}
      >
        {/* ground information */}
        <h5 className="card-title mb-1 text-white">{ground.ground_name}</h5>
        <p className="card-text text-white small mb-2">{ground.location}</p>
        <p className="fw-bold text-info mb-3" style={{ color: "#5a9f68" }}>
          AED {ground.price_per_hour}/hr
        </p>

        {/* booking button */}
        <Link
          to={`/book/${ground.ground_id}`}
          className="btn btn-book mt-auto rounded-pill fw-semibold"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
