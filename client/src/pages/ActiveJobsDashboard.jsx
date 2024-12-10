import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axiosInstance from "../utils/axiosInstancs";
const ActiveJobsDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState("A");
  const [detailView, setDetailView] = useState();

  const getJobs = async () => {
    const response = await axiosInstance.get("/get_all_jobs");
    setJobs(response.data.jobs);
  };
  const getUser = async () => {
    const response = await axiosInstance.get("/get_user");
    setUser(response.data.user.fullname);
  };

  const handleSelect = async (job_id) => {
    if (detailView != false) {
      navigate(`/jobs/edit/${job_id}`);
    }
  };
  const handleDelete = async (job_id) => {
    const response = await axiosInstance.delete(`/delete_job/${job_id}`);
    console.log(response.data.message);
    getJobs();
  };
  useEffect(() => {
    getJobs();
    getUser();
  }, []);
  return (
    <div>
      <NavBar user={user} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-24 px-4">
        <div className="max-w-screen-lg mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-serif text-blue-600 tracking-wide">
              Active Jobs
            </h1>
            <button
              onClick={() => navigate("/jobs/upload")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Add a New Job
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-white shadow-lg rounded-lg p-4 text-center">
            {[
              "Select",
              "Job Code",
              "Job Title",
              "Client Bill Rate",
              "Pay Rate",
              "Location",
              "Job Status",
              "Client",
              "End Client",
              "Client Job ID",
              "Client Manager",
              "Priority",
            ].map((header, index) => (
              <div key={index} className="font-semibold text-gray-700 text-sm">
                {header}
              </div>
            ))}
          </div>

          {/* Job Cards */}
          <div className="mt-4 space-y-4">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onClick={(e) => {
                      console.log("here", e.target.checked);
                      setDetailView(e.target.checked);
                      handleSelect(job.job_id);
                    }}
                  />
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.job_code}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.job_title}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.client_bill}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.pay_rate}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.location}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.status}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.client}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.end_client}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.job_code}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.user_id}</p>
                </div>
                <div className="text-gray-600 flex items-center justify-center">
                  <p>{job.priority}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveJobsDashboard;
