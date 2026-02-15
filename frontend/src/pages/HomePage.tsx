import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const HomePage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="home-wrapper">
      <section className="hero-content">
        <h1
          className="auth-title glow-green"
          style={{ fontSize: "4.5rem", lineHeight: "1.1" }}
        >
          LEVEL UP YOUR <span className="glow-blue">STRENGTH</span>
        </h1>
        <p
          className="auth-subtitle"
          style={{ fontSize: "1.3rem", marginTop: "20px" }}
        >
          Prati svoje treninge, analiziraj napredak i postigni rezultate o
          kojima si sanjao/la! Tvoja digitalna beležnica za teretanu je spremna.
          😎
        </p>

        <div className="cta-buttons">
          {user ? (
            <Link to="/workouts" className="btn-neon btn-green">
              IDI NA MOJE TRENINGE
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-neon"
                style={{
                  border: "1px solid var(--neon-green)",
                  color: "var(--neon-green)",
                  background: "transparent",
                }}
              >
                PRIJAVI SE
              </Link>
              <Link to="/register" className="btn-neon btn-green">
                ZAPOČNI BESPLATNO
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3 className="glow-blue">Beleženje</h3>
          <p>
            Lako dodaj vežbe, setove i ponavljanja u realnom vremenu bez
            ometanja treninga.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="glow-green">Statistika</h3>
          <p>
            Prati svoj progres kroz vizuelne grafikone i istoriju svih tvojih
            podignutih težina.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="glow-blue">Ciljevi</h3>
          <p>
            Postavi lične rekorde i uživaj u procesu postajanja bolje verzije
            sebe svakog narednog dana!
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
