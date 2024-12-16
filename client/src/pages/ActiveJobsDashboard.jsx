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

  const columns = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar user={user}></NavBar>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 mt-16">
          <div className="flex justify-between mb-3">
            <h1 className="text-4xl font-bold text-black mb-4">Active Jobs</h1>
            <div className="flex items-center">
              <button
                onClick={() => navigate("/jobs/upload")}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Add Job
              </button>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map((job, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-4 flex items-center justify-center whitespace-nowrap text-sm text-gray-700">
                      <input
                        type="checkbox"
                        onClick={() => {
                          console.log("here", job.job_id);
                          handleSelect(job.job_id);
                        }}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.job_code}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.job_title}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.client_bill}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.pay_rate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.location}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.status}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.client}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.end_client}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.job_code}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.user_id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {job.priority}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveJobsDashboard;
