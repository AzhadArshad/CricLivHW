// src/pages/GroundList.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import GroundCard from "../components/GroundCard";
import { toast } from "react-hot-toast";

export default function GroundList() {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const res = await API.get("/grounds");
        setGrounds(res.data);
      } catch (err) {
        toast.error("Failed to load grounds");
      } finally {
        setLoading(false);
      }
    };
    fetchGrounds();
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="container py-5 mt-5">
        <div className="text-center mb-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading grounds...</span>
          </div>
        </div>
        <div className="row g-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0 bg-dark text-light animate-pulse">
                <div
                  className="bg-secondary"
                  style={{ height: "180px", borderRadius: "12px 12px 0 0" }}
                ></div>
                <div className="card-body p-3">
                  <div
                    className="h-5 bg-secondary rounded mb-2"
                    style={{ height: "1.2rem" }}
                  ></div>
                  <div
                    className="h-6 bg-secondary rounded w-75 mb-2"
                    style={{ height: "1rem" }}
                  ></div>
                  <div
                    className="h-6 bg-secondary rounded w-50"
                    style={{ height: "1rem" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header (Image from 'public' folder) */}
      <div
        className="position-relative overflow-hidden"
        style={{
          // --- Image path from the 'public' directory ---
          backgroundImage: "url('/images/azhad.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
          marginTop: "80px",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0, 0, 0, 0.78)",
          }}
        />
        <div className="container position-relative d-flex flex-column justify-content-center align-items-center h-100 py-5 px-3">
          <h1
            className="display-3 fw-bold mb-3 text-white"
            style={{ marginTop: "10rem" }}
          >
            Available Cricket Grounds
          </h1>

          <p
            className="lead text-white-50 mb-4 text-center"
            style={{ maxWidth: "600px" }}
          >
            Book your perfect pitch for the ultimate game
          </p>

          <span className="badge rounded-pill bg-success fs-6 px-4 py-2">
            {grounds.length} Ground{grounds.length !== 1 ? "s" : ""} Available
          </span>
        </div>
      </div>

      {/* Empty State */}
      <div className="container py-5">
        {grounds.length === 0 ? (
          <div className="text-center py-5">
            <div className="bg-dark rounded-3 p-5 d-inline-block">
              <div className="display-1 text-muted mb-3">Cricket</div>
              <p className="text-muted fs-5">No grounds available yet.</p>
              <button className="btn btn-outline-success mt-3">
                Refresh List
              </button>
            </div>
          </div>
        ) : (
          /* Grounds Grid */
          <div className="row g-4 justify-content-center">
            {grounds.map((ground) => (
              <div
                key={ground.ground_id}
                className="col-sm-6 col-md-4 col-lg-3"
              >
                <div className="h-100 transform transition-transform duration-300 hover:-translate-y-1">
                  <GroundCard ground={ground} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
