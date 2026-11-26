# GymTracker

> A full-stack fitness-tracking application for logging workouts and visualizing training progress through interactive weekly charts.

GymTracker lets fitness enthusiasts record their training sessions and see how their effort trends over time. A secured ASP.NET Core Web API persists workouts to SQL Server and serves pre-aggregated weekly statistics, which a React + TypeScript single-page app renders as interactive Chart.js line charts.

---

## Demo

https://github.com/user-attachments/assets/535ff066-5ac9-46e3-913a-b2954f870d03

---

## Tech stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 18, TypeScript, Vite |
| **Charts** | Chart.js, react-chartjs-2 |
| **State management** | Zustand |
| **HTTP client** | Axios (Bearer-token request interceptor) |
| **Routing** | React Router 6 (protected routes) |
| **Styling** | Vanilla CSS |
| **Backend** | ASP.NET Core Web API (.NET 8) |
| **ORM** | Entity Framework Core (SQL Server provider) |
| **Mapping** | AutoMapper (entity ⇄ DTO) |
| **Authentication** | JWT Bearer tokens, hashed passwords |
| **API docs** | Swagger / OpenAPI (Swashbuckle) |
| **Database** | Microsoft SQL Server |

---

## Features

- **Authentication** — register and log in; the API issues a JWT, which the SPA stores and attaches to every request. Routes and screens are protected end to end.
- **Workout logging** — record a workout with its exercise type, date, duration, calories burned, and perceived **difficulty** and **fatigue** (1–10 scales), plus optional notes.
- **Dynamic progress visualization** — interactive weekly line charts for a selected month:
  - **Total duration (min)** — minutes trained per week.
  - **Workout count** — sessions per week.
  - **Average difficulty / fatigue** — perceived-exertion trends.
- **Server-side aggregation** — weekly statistics are computed on the backend and returned as a purpose-built DTO, so the client renders charts without doing the number-crunching.
- **Soft delete** — workouts are flagged rather than physically removed, preserving history.

---

## Architecture

### Backend — layered & service-oriented

A clean separation of concerns with dependency injection throughout:

```
Controller → Service (interface) → Repository (interface) → EF Core (AppDbContext) → SQL Server
```

- **Controllers** — thin HTTP endpoints; protected actions carry `[Authorize]`.
- **Services** — business logic (workout creation, weekly aggregation, auth), each behind an interface.
- **Repositories** — data access over EF Core, each behind an interface.
- **AutoMapper** — maps entities to/from DTOs so the API never leaks entity internals.
- **JWT auth** — `JwtService` issues tokens; the pipeline validates issuer, audience, signing key, and lifetime (zero clock skew). Passwords are hashed before storage.
- **Swagger** — interactive API docs with a built-in Bearer authorization scheme (enabled in development).

### Frontend — service-oriented SPA

Feature pages (`Home`, `Login`, `Register`, `Workouts`) consume a thin API-service layer (`services/api/*`) built on a shared Axios client. A request interceptor injects the JWT from the Zustand `authStore`, and a `ProtectedRoute` guard gates authenticated screens. This keeps HTTP concerns out of the components and the communication with the backend consistent and reliable.

---

## Data model

Three tables in SQL Server:

| Table | Key columns |
| --- | --- |
| **Users** | `Id`, `FirstName`, `LastName`, `Email` (unique), `UserPassword` (hashed), `Gender`, `CreatedAt`, `IsDeleted` |
| **ExerciseTypes** | `Id`, `Name` |
| **Workouts** | `Id`, `UserId` → Users, `ExerciseTypeId` → ExerciseTypes, `WorkoutDate`, `DurationMinutes`, `CaloriesBurned`, `Difficulty` (1–10), `Fatigue` (1–10), `Notes`, `CreatedAt`, `IsDeleted` |

`Difficulty` and `Fatigue` are enforced with `CHECK (… BETWEEN 1 AND 10)` constraints. The full schema is in [`database/script.sql`](database/script.sql).

---

## API reference

Base URL (development): `http://localhost:5244/api`

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | Register a new user |
| `POST` | `/auth/login` | Public | Authenticate and receive a JWT |
| `GET` | `/user/me` | Private | Current user's profile |
| `GET` | `/workouts/myWorkouts` | Private | The authenticated user's workouts |
| `POST` | `/workouts` | Private | Log a new workout |
| `GET` | `/workouts/stats/{month}/{year}` | Private | Weekly aggregated statistics for a month |
| `GET` | `/exercisetype` | Private | List available exercise types |

---

## Getting started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 18+
- [Microsoft SQL Server](https://www.microsoft.com/sql-server) (or SQL Server Express / LocalDB)

### 1. Database

Create the schema by running [`database/script.sql`](database/script.sql) against your SQL Server instance (it creates the `Users`, `ExerciseTypes`, and `Workouts` tables).

### 2. Backend

Configure the connection string and JWT settings in `backend/GymTrackerApp/appsettings.json` (or via user secrets):

```jsonc
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GymTracker;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "JwtConfig": {
    "Issuer": "GymTrackerApp",
    "Audience": "GymTrackerApp",
    "Key": "your-long-random-signing-key"
  }
}
```

Then run the API:

```bash
cd backend/GymTrackerApp
dotnet restore
dotnet run
```

The API starts on `http://localhost:5244`, with Swagger UI at `http://localhost:5244/swagger` in development.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` (allowed by the backend's CORS policy). The API base URL is configured in `frontend/src/services/api/apiClient.ts`.
