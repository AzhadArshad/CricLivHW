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
      <div className="container py-5">
        <div className="text-center mb-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <div className="row g-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0 animate-pulse">
                <div
                  className="bg-light border-bottom"
                  style={{ height: "180px" }}
                ></div>
                <div className="card-body">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-75 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-50"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="container">
        {/* Hero Header (Image from 'public' folder) */}
        <div
          className="container-fluid py-5 mb-5 text-center"
          style={{
            // --- Image path from the 'public' directory ---
            backgroundImage: "url('/images/virat.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container bg-dark bg-opacity-75 text-white py-5 rounded-3">
            <h1 className="display-4 fw-bold mb-3">
              Available Cricket Grounds
            </h1>

            <p className="lead text-white-50 mb-4">
              Book your perfect pitch for the ultimate game
            </p>

            <span className="badge rounded-pill bg-success fs-6 fw-medium px-3 py-2">
              {grounds.length} Ground{grounds.length !== 1 ? "s" : ""} Available
            </span>
          </div>
        </div>

        {/* Empty State */}
        {grounds.length === 0 ? (
          <div className="text-center py-5">
            <div className="bg-light rounded-3 p-5 d-inline-block">
              <div className="display-1 text-muted mb-3">Cricket</div>
              <p className="text-muted fs-5">No grounds available yet.</p>
              <button className="btn btn-outline-primary mt-3">
                Refresh List
              </button>
            </div>
          </div>
        ) : (
          /* Grounds Grid */
          <div className="row g-4">
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
