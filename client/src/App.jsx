import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import SignUppage from "./pages/SignUppage";
import UploadPage from "./pages/UploadPage";
import AllDocuments from "./pages/AllDocuments";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ActiveJobsDashboard from "./pages/ActiveJobsDashboard";
import JobUploadPage from "./pages/JobUploadPage";
import JobEdit from "./pages/JobEdit";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
    {
      path: "/signup",
      element: <SignUppage />,
    },
    {
      path: "/dashboard/upload",
      element: <UploadPage />,
    },
    {
      path: "/all_documents",
      element: <AllDocuments />,
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
    {
      path: "/adminDashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/jobs",
      element: <ActiveJobsDashboard />,
    },
    {
      path: "/jobs/edit/:job_id",
      element: <JobEdit />,
    },
    {
      path: "/jobs/upload",
      element: <JobUploadPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
