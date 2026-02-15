import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Navbar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo glow-green">
        GYM <span className="glow-blue">Tracker</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Početna
        </Link>

        {user ? (
          <>
            <Link to="/workouts" className="nav-link">
              Moji Treninzi
            </Link>
            <span
              className="nav-link"
              style={{ cursor: "default", color: "var(--text-main)" }}
            >
              | {user.firstName}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Odjavi se
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Prijava
            </Link>
            <Link
              to="/register"
              className="btn-neon btn-green"
              style={{ marginLeft: "10px" }}
            >
              Registracija
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
