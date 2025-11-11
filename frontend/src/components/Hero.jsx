// src/components/Hero.jsx
// PURPOSE: Reusable, responsive hero section
// FEATURES:
//   - Full-width background image
//   - Dark overlay
//   - Scalable text with clamp()
//   - CTA button
//   - Mobile-first RWD

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "60vh",
        backgroundImage: "url('/images/image1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        padding: "2rem 1rem",
      }}
    >
      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.55)",
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          padding: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            marginBottom: "1rem",
            fontWeight: "bold",
            lineHeight: "1.2",
          }}
        >
          Book Your Cricket Ground
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 4vw, 1.4rem)",
            marginBottom: "2rem",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Premium turfs, floodlights, and indoor arenas in Dubai — available
          24/7
        </p>
        <Link
          to="/grounds"
          style={{
            background: "#28a745",
            color: "white",
            padding: "0.9rem 2rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "clamp(1rem, 3vw, 1.1rem)",
            display: "inline-block",
          }}
        >
          Browse Grounds
        </Link>
      </div>
    </section>
  );
}
