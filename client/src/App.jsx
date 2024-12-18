import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import SignUppage from "./pages/SignUppage";
import UploadPage from "./pages/UploadPage";
import AllDocuments from "./pages/AllDocuments";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ActiveJobsDashboard from "./pages/ActiveJobsDashboard";
import JobUploadPage from "./pages/JobUploadPage";
import JobEdit from "./pages/JobEdit";
import Applicants from "./pages/Applicants";
import ApplicantEdit from "./pages/ApplicantEdit";
import ApplicantUpload from "./pages/ApplicantUpload";
import ClientHome from "./pages/ClientsPage/ClientHome";
import AddClientSub from "./pages/ClientsPage/AddClientSub";
import ClientEditPage from "./pages/ClientsPage/ClientEditPage";
import AddServedJobs from "./pages/DashBoardPages/AddServedJobs.jsx";
import { Edit } from "lucide-react";
import EditServedJobs from "./pages/DashBoardPages/EditServedJobs";
import AddSubmissions from "./components/AddSubmissions.jsx";
import ViewSubmission from "./components/ViewSubmission.jsx";

function App() {
  function ViewSubmissionWrapper() {
    const { id } = useParams(); // Extract the `id` from the URL
    // return <viewSubmission id={id} />;
    return (
      <div>
        <ViewSubmission id={id} />;
      </div>
    );
  }
  function AddSubmissionsWrapper() {
    const { id } = useParams(); // Extract the `id` from the URL
    return <AddSubmissions id={id} />;
  }
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

    {
      path: "/Applicants",
      element: <Applicants />,
    },
    {
      path: "/Applicants/:id",
      element: <ApplicantEdit />,
    },
    {
      path: "/Applicant-Upload",
      element: <ApplicantUpload />,
    },
    {
      path: "/Clients-Submission",
      element: <ClientHome />,
    },
    {
      path: "/add-applicant",
      element: <AddClientSub />,
    },
    {
      path: "/Clients-Submission/edit/:id",
      element: <ClientEditPage></ClientEditPage>,
    },
    {
      path: "dashboard/servedjobs/addjob",
      element: <AddServedJobs></AddServedJobs>,
    },
    {
      path: "/served-jobs/edit/:id",
      element: <EditServedJobs></EditServedJobs>,
    },
    {
      path: "/jobs/add-submission/:id",
      element: <AddSubmissionsWrapper />,
    },
    {
      path: "/jobs/view-submission/:id",
      element: <ViewSubmissionWrapper />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
