import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api/authService";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "Male",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await register(formData);

    if (result.success) {
      navigate("/login");
    } else {
      setError(
        "Registracija nije uspela. Proverite da li je email već u upotrebi.",
      );
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "500px" }}>
        <h2 className="auth-title glow-blue">Registracija</h2>
        <p className="auth-subtitle">Postani deo GYM Tracker zajednice</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div className="form-group">
              <label>Ime</label>
              <input
                type="text"
                className="form-input"
                required
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Prezime</label>
              <input
                type="text"
                className="form-input"
                required
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Lozinka</label>
            <input
              type="password"
              className="form-input"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Pol</label>
            <select
              className="form-input"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="Male">Muški</option>
              <option value="Female">Ženski</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-neon btn-green"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "Slanje..." : "Kreiraj nalog"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Već imaš nalog?{" "}
          <Link to="/login" className="auth-link">
            Prijavi se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
