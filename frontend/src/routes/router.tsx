import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import WorkoutsPage from "../pages/WorkoutsPage";
import ProtectedRoute from "../components/common/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "workouts",
            element: <WorkoutsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <h1 className="p-4">404 - Stranica nije pronađena.</h1>,
      },
    ],
  },
]);
