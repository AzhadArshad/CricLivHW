import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService"; // API call to register
import { startLogin } from "../utils/auth"; // Save token + user

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email_id: "",
    my_password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop form from refreshing page
    setError(""); // Clear previous errors

    try {
      // CALL API: POST /api/auth/register
      const response = await register(formData);

      // SUCCESS: response.data = { token, user }
      // Save login state using utils/auth.login()
      startLogin(response.token, response.user);

      // Redirect to login page (or home if you want auto-login)
      navigate("/login");
    } catch (err) {
      // ERROR: show message from backend (e.g. "Email already exists")
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Register</h2>

      {/* SHOW ERROR IF ANY */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* FORM: onSubmit calls handleSubmit */}
      <form onSubmit={handleSubmit}>
        {/* USERNAME INPUT */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            margin: "0.5rem 0",
            padding: "0.5rem",
          }}
        />

        {/* EMAIL INPUT */}
        <input
          type="email"
          name="email_id"
          placeholder="Email"
          value={formData.email_id}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            margin: "0.5rem 0",
            padding: "0.5rem",
          }}
        />

        {/* PASSWORD INPUT */}
        <input
          type="password"
          name="my_password"
          placeholder="Password"
          value={formData.my_password}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            margin: "0.5rem 0",
            padding: "0.5rem",
          }}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          style={{
            background: "#007bff",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            cursor: "pointer",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          Register
        </button>
      </form>

      {/* LINK TO LOGIN */}
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}
