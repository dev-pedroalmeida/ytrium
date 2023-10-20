import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <StudentDashboard />,
        children: [
          {
            path: "courses",
            element: <CoursesPage />
          }
        ]
      },
      {
        path: "/instructor",
        element: <InstructorDashboard />
      },
      {
        path: "/admin",
        element: <AdminDashboard />
      }
    ]
  },
  {
    path: "landing",
    element: <LandingPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
