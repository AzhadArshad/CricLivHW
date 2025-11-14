// src/components/Hero.jsx
// PURPOSE: Reusable, responsive hero section
// FEATURES:
//   - Full-width background image
//   - Dark overlay
//   - Scalable text with clamp()
//   - CTA button
//   - Mobile-first RWD

import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./Hero.css";

export default function Hero() {
  return (
    <section
      className="hero d-flex align-items-center justify-content-center text-center text-light position-relative"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/image1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: 0,
        padding: 0,
        marginTop: "50px",
      }}
    >
      {/* DARK OVERLAY */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0, 0, 0, 0.78)",
        }}
      />

      {/* CONTENT */}
      <Container
        className="position-relative z-1 px-3"
        style={{ maxWidth: "900px" }}
      >
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "clamp(2rem, 8vw, 4rem)", letterSpacing: "1.5px" }}
        >
          Book Your Cricket Ground
        </h1>

        <p
          className="mb-4 mx-auto"
          style={{
            fontSize: "clamp(1rem, 4vw, 1.4rem)",
            maxWidth: "700px",
            color: "#FFF7EC",
          }}
        >
          Premium turfs, floodlights, and indoor arenas in Dubai — available
          24/7
        </p>

        <Link
          to="/grounds"
          className="btn btn-pink btn-lg rounded-pill px-5 py-3 fw-semibold"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.15rem)",
          }}
        >
          Browse Grounds
        </Link>
      </Container>
    </section>
  );
}
