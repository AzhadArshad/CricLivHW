// src/pages/BecomeAdmin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BecomeAdmin() {
  const [formData, setFormData] = useState({
    email_id: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic validation
    if (!formData.email_id || !formData.phone_number) {
      setError("Please fill in both fields.");
      setLoading(false);
      return;
    }

    // Fake delay to simulate submission
    setTimeout(() => {
      setSuccess(
        "Thank you! We will contact you shortly for the admin registration process."
      );
      setFormData({ email_id: "", phone_number: "" });
      setLoading(false);
    }, 1200); // 1.2 sec delay
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "500px", margin: "4rem auto" }}
    >
      <div className="card shadow-lg border-0">
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold text-success">
            Become an Admin
          </h2>
          <p className="text-center text-muted mb-4">
            Fill in your details and we'll get in touch to complete your admin
            registration.
          </p>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="alert alert-success text-center" role="alert">
              {success}
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="mb-3">
              <label htmlFor="email_id" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email_id"
                name="email_id"
                className="form-control form-control-lg"
                placeholder="you@example.com"
                value={formData.email_id}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* PHONE */}
            <div className="mb-4">
              <label htmlFor="phone_number" className="form-label fw-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                className="form-control form-control-lg"
                placeholder="+971 50 123 4567"
                value={formData.phone_number}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="btn btn-success btn-lg w-100 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Sending...
                </>
              ) : (
                "Request Admin Access"
              )}
            </button>
          </form>

          {/* BACK LINK */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-link text-decoration-none"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
