import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import StudentDashboard from "./pages/student/StudentDashboard";
import CoursesPage from "./pages/CoursesPage.jsx";
import SubscriptionsPage from "./pages/student/SubscriptionsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import StudentHome from "./pages/student/StudentHome";
import InstructorHome from "./pages/instructor/InstructorHome";
import AdminHome from "./pages/admin/AdminHome";
import AdminUsersList from "./pages/admin/AdminUsersList";
import AdminCoursesList from "./pages/admin/AdminCoursesList";
import AdminBadges from "./pages/admin/AdminBadges";
import NewCourse from "./pages/instructor/NewCourse";
import CoursePage from "./pages/CoursePage";
import AdminCategories from "./pages/admin/AdminCategories";

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
        path: "/course/:courseId",
        element: <CoursePage />,
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
          {
            path: "new-course",
            element: <NewCourse />,
          }
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
          },
          {
            path: "categories",
            element: <AdminCategories />
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
