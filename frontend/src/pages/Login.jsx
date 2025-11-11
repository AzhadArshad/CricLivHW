import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // API call to login
import { startLogin, logout } from "../utils/auth"; // Save token + user

export default function Login() {
  // FORM STATE: holds email and password
  const [formData, setFormData] = useState({
    email_id: "",
    my_password: "",
  });

  // ERROR STATE: show messages like "Invalid credentials"
  const [error, setError] = useState("");

  // NAVIGATION: redirect after successful login
  const navigate = useNavigate();

  // HANDLE INPUT CHANGES
  // Update formData as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE FORM SUBMISSION
  // 1. Prevent page reload
  // 2. Call login API
  // 3. Save token + user using utils/auth.login()
  // 4. Redirect to home or dashboard
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop form from refreshing
    setError(""); // Clear previous error

    try {
      // CALL API: POST /api/auth/login
      // Sends { email_id, my_password }
      const response = await login(formData);

      // SUCCESS: response.data = { token, user }
      // Save login state (token + user object)
      startLogin(response.token, response.user);

      // REDIRECT: go to home page (or dashboard)
      navigate("/");
    } catch (err) {
      // ERROR: show backend message (e.g. "Invalid credentials")
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      console.error("Login error:", err); // Debug in console
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Login</h2>

      {/* SHOW ERROR IF ANY */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* FORM: onSubmit calls handleSubmit */}
      <form onSubmit={handleSubmit}>
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
            background: "#28a745",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            cursor: "pointer",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          Login
        </button>
      </form>

      {/* LINK TO REGISTER */}
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}
