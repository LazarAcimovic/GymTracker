import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { workoutService } from "../services/api/workoutService";
import type {
  WeeklyProgress,
  Workout,
  ExerciseType,
} from "../models/WorkoutModel";
import { exerciseService } from "../services/api/exerciseService.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type Metric = "duration" | "count" | "difficulty" | "fatigue";

const WorkoutsPage: React.FC = () => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [activeMetric, setActiveMetric] = useState<Metric>("duration");
  const [stats, setStats] = useState<WeeklyProgress[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]); // Za dropdown
  const [formData, setFormData] = useState({
    exerciseTypeId: 1,
    workoutDate: new Date().toISOString().split("T")[0],
    durationMinutes: 60,
    caloriesBurned: 300,
    difficulty: 5,
    fatigue: 5,
    notes: "",
  });

  const metricConfig = {
    duration: {
      label: "Ukupno trajanje (min)",
      color: "#00f3ff",
      key: "totalDuration",
    },
    count: { label: "Broj treninga", color: "#ffcc00", key: "workoutCount" },
    difficulty: {
      label: "Prosečna težina",
      color: "#39ff14",
      key: "averageDifficulty",
    },
    fatigue: {
      label: "Prosečan umor",
      color: "#ff3131",
      key: "averageFatigue",
    },
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, workoutsData] = await Promise.all([
        workoutService.getWeeklyStats(selectedMonth, now.getFullYear()),
        workoutService.getMyWorkouts(),
      ]);

      setStats(statsData);
      const sorted = [...workoutsData].sort((a, b) => a.id - b.id);

      setWorkouts(sorted);
    } catch (err) {
      console.error("Greška pri učitavanju:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const types = await exerciseService.getAllTypes();
        setExerciseTypes(types);

        if (types.length > 0) {
          setFormData((prev) => ({ ...prev, exerciseTypeId: types[0].id }));
        }
      } catch (err) {
        console.error("Greška pri dohvatanju tipova vežbi:", err);
      }
    };

    fetchInitialData();
  }, []);

  const chartData = {
    labels:
      stats.length > 0
        ? stats.map((s) => `Nedelja ${s.weekNumber}`)
        : ["Ned 1", "Ned 2", "Ned 3", "Ned 4", "Ned 5"],
    datasets: [
      {
        label: metricConfig[activeMetric].label,
        data: stats.map(
          (s) => s[metricConfig[activeMetric].key as keyof WeeklyProgress],
        ),
        borderColor: metricConfig[activeMetric].color,
        backgroundColor: `${metricConfig[activeMetric].color}22`,
        tension: 0.3,
        fill: true,
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: activeMetric === "count",
        suggestedMax: activeMetric === "count" ? 6 : undefined,

        title: {
          display: true,
          text: metricConfig[activeMetric].label,
          color: "#fff",
        },
        grid: {
          color: "#222",
        },
        ticks: {
          color: "#aaa",
          stepSize: activeMetric === "count" ? 1 : undefined,
          precision: activeMetric === "count" ? 0 : undefined,
          callback: function (value: any) {
            if (activeMetric === "count") {
              return Math.floor(value) === value ? value : null;
            }
            return value;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Nedelje u mesecu",
          color: "#fff",
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#aaa",
        },
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await workoutService.createWorkout(formData);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Greška pri čuvanju treninga");
    }
  };

  return (
    <div className="workouts-container">
      <div className="workouts-header">
        <h1 className="glow-green">MOJI TRENINZI</h1>
        <div className="header-actions">
          <select
            className="form-input month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {[
              "Januar",
              "Februar",
              "Mart",
              "April",
              "Maj",
              "Jun",
              "Jul",
              "Avgust",
              "Septembar",
              "Oktobar",
              "Novembar",
              "Decembar",
            ].map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
          <button
            className="btn-neon btn-green"
            onClick={() => setIsModalOpen(true)}
          >
            + NOVI TRENING
          </button>
        </div>
      </div>

      <div className="metric-toggle-group">
        {(Object.keys(metricConfig) as Metric[]).map((key) => (
          <button
            key={key}
            className={`btn-metric ${activeMetric === key ? "active" : ""}`}
            onClick={() => setActiveMetric(key)}
            style={
              {
                "--metric-color": metricConfig[key].color,
              } as React.CSSProperties
            }
          >
            {metricConfig[key].label}
          </button>
        ))}
      </div>

      <div className="auth-card chart-section">
        {loading ? (
          <p>Učitavanje...</p>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>

      <h2 className="glow-blue section-title">ISTORIJA TRENINGA</h2>

      <div className="workouts-grid">
        {workouts.length > 0 ? (
          workouts.map((w) => (
            <div key={w.id} className="auth-card workout-card">
              <div className="workout-card-header">
                <h3 className="glow-green">{w.exerciseTypeName}</h3>
                <span>
                  {new Date(w.workoutDate).toLocaleDateString("sr-RS")}
                </span>
              </div>
              <div className="workout-summary">
                <p>
                  Trajanje: <strong>{w.durationMinutes} min</strong>
                </p>
                <p>
                  Težina:{" "}
                  <strong className="glow-blue">{w.difficulty}/10</strong>
                </p>
                <p>
                  Umor: <strong className="glow-red">{w.fatigue}/10</strong>
                </p>
              </div>
              {/* Prikazujemo belešku samo ako postoji */}
              {w.notes && <p className="workout-notes">{w.notes}</p>}
            </div>
          ))
        ) : (
          <p style={{ color: "#aaa", gridColumn: "1 / -1" }}>
            Nema zabeleženih treninga.
          </p>
        )}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="glow-green">NOVI TRENING</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tip Vežbe</label>
                <select
                  className="form-input"
                  value={formData.exerciseTypeId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      exerciseTypeId: Number(e.target.value),
                    })
                  }
                >
                  {exerciseTypes.length > 0 ? (
                    exerciseTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Učitavanje tipova...</option>
                  )}
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Trajanje (min)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.durationMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationMinutes: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Kalorije</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.caloriesBurned}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caloriesBurned: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Težina (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    style={{ accentColor: "#39ff14" }}
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: Number(e.target.value),
                      })
                    }
                  />
                  <span style={{ color: "#fff" }}>{formData.difficulty}</span>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Umor (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    style={{ accentColor: "#39ff14" }}
                    value={formData.fatigue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fatigue: Number(e.target.value),
                      })
                    }
                  />
                  <span style={{ color: "#fff" }}>{formData.fatigue}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Beleške</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Odustani
                </button>
                <button type="submit" className="btn-neon btn-green btn-submit">
                  SAČUVAJ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
