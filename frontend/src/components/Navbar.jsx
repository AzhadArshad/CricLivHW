// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { getUser, logout, isAdmin } from "../utils/auth";

export default function Navbar() {
  const user = getUser();

  return (
    <div>
      <p>navbar</p>
    </div>
  );
}
