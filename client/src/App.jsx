import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import SignUppage from "./pages/SignUppage";
import UploadPage from "./pages/UploadPage";
import AllDocuments from "./pages/AllDocuments";
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
