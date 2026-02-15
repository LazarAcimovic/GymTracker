import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      navigate("/workouts"); 
    } else {
      setError("Neispravni podaci za prijavu. Pokušajte ponovo.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title glow-green">Prijava</h2>
        <p className="auth-subtitle">Nastavi svoju transformaciju</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email adresa</label>
            <input
              type="email"
              className="form-input"
              placeholder="ime@primer.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Lozinka</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-neon btn-green"
            style={{ width: "100%", marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? "Prijavljivanje..." : "Prijavi se"}
          </button>
        </form>

        <p
          style={{ textAlign: "center", marginTop: "20px", fontSize: "0.9rem" }}
        >
          Nemate nalog?{" "}
          <Link to="/register" className="auth-link">
            Registrujte se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
