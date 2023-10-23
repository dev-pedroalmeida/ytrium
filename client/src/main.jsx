import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import StudentDashboard from "./pages/StudentDashboard";
import CoursesPage from "./pages/CoursesPage.jsx";
import SubscriptionsPage from "./pages/SubscriptionsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorCourses from "./pages/InstructorCourses";
import StudentHome from "./pages/StudentHome";
import InstructorHome from "./pages/InstructorHome";
import AdminHome from "./pages/AdminHome";
import AdminUsersList from "./pages/AdminUsersList";
import AdminCoursesList from "./pages/AdminCoursesList";
import AdminBadges from "./pages/AdminBadges";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/landing",
        element: <LandingPage />,
      },
      {
        path: "/student",
        element: <StudentDashboard />,
        children: [
          {
            index: true,
            element: <StudentHome />
          },
          {
            path: "explore",
            element: <CoursesPage />
          },
          {
            path: "subscriptions",
            element: <SubscriptionsPage />
          }
        ]
      },
      {
        path: "/instructor",
        element: <InstructorDashboard />,
        children: [
          {
            index: true,
            element: <InstructorHome />,
          },
          {
            path: "courses",
            element: <InstructorCourses />,
          },
        ]
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <AdminHome />,
          },
          {
            path: "users",
            element: <AdminUsersList />,
          },
          {
            path: "courses",
            element: <AdminCoursesList />
          },
          {
            path: "badges",
            element: <AdminBadges />
          }
        ]
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
