// src/App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GroundList from "./pages/GroundList";
import BookingPage from "./pages/BookingPage";

// Dashboard pages
import UserDashboard from "./pages/dashboard/UserDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminGrounds from "./pages/dashboard/AdminGrounds";
import AdminBookings from "./pages/dashboard/AdminBookings";
import UserBookings from "./pages/dashboard/UserBookings";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Auth utils
import { getUser, isAdmin } from "./utils/auth";

// PROTECTED ROUTE
const Protected = ({ children, adminOnly = false }) => {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin()) return <Navigate to="/" replace />;
  return children;
};

// REDIRECT AFTER LOGIN
const RedirectAfterLogin = () => {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (hasRedirected) return; // Prevent double redirect

    const user = getUser();
    if (user) {
      setHasRedirected(true);
      if (isAdmin()) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, hasRedirected]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container" style={{ minHeight: "80vh", padding: "1rem" }}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/grounds" element={<GroundList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* POST-LOGIN REDIRECT */}
          <Route path="/redirect" element={<RedirectAfterLogin />} />

          {/* USER PROTECTED */}
          <Route
            path="/book"
            element={
              <Protected>
                <BookingPage />
              </Protected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <UserDashboard />
              </Protected>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <Protected>
                <UserBookings />
              </Protected>
            }
          />

          {/* ADMIN PROTECTED */}
          <Route
            path="/admin"
            element={
              <Protected adminOnly>
                <AdminDashboard />
              </Protected>
            }
          />
          <Route
            path="/admin/grounds"
            element={
              <Protected adminOnly>
                <AdminGrounds />
              </Protected>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <Protected adminOnly>
                <AdminBookings />
              </Protected>
            }
          />

          {/* CATCH ALL */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
