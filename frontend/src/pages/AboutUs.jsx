// src/pages/AboutUs.jsx
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Azhad Arshad",
    role: "Backend Developer",
    image: "/images/azhad2.jpeg",
  },
  {
    name: "Farida Adnan",
    role: "Frontend Developer",
    image: "/images/farida.jpeg",
  },
  {
    name: "Aliza Naqvi",
    role: "Lead UX/UI Designer",
    image: "/images/aliza.jpeg",
  },
  {
    name: "Madeeha Siddiqui",
    role: "Report Analyst",
    image: "/images/madds.jpeg",
  },
  {
    name: "Zunayesha",
    role: "Database Administrator",
    image: "/images/aliza.jpeg",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO – SAME AS GROUNDS PAGE */}
      <div
        className="position-relative overflow-hidden d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundColor: "#000",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
          marginTop: "80px",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0, 0, 0, 0.75)" }}
        />
        <div
          className="container position-relative px-3"
          style={{ maxWidth: "800px" }}
        >
          <h1 className="display-3 fw-bold mb-3 text-white">Meet Our Team</h1>
          <p
            className="lead text-white-50 mb-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            Passionate cricketers and professionals dedicated to your game.
          </p>
          <span className="badge bg-success fs-6 px-4 py-2 rounded-pill">
            5 Members
          </span>
        </div>
      </div>

      {/* TEAM GRID */}
      <div className="container py-5">
        <div className="d-flex felx-nowrap gap-4 px-3 hide-scrollbar">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex-shrink-0">
              <div
                className="card h-100 bg-success text-white border-0 shadow-lg rounded-3 overflow-hidden d-flex flex-column transition-transform duration-300 hover-lift"
                style={{
                  background:
                    "linear-gradient(135deg, #1a4d2e 0%, #0e3d1c 100%)",
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => (e.target.src = "/team/default.jpg")}
                />
                <div
                  className="card-body d-flex flex-column p-3 flex-grow-1"
                  style={{ minHeight: "140px" }}
                >
                  <h5 className="card-title mb-1 fw-bold">{member.name}</h5>
                  <p className="text-info small mb-2">{member.role}</p>
                  <p className="card-text small text-white-50 flex-grow-1">
                    {member.bio}
                  </p>
                  <Link
                    to="#"
                    className="btn btn-pink mt-auto rounded-pill fw-semibold d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#5a9f68",
                      color: "#000",
                      minHeight: "44px",
                      fontSize: "0.9rem",
                    }}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
