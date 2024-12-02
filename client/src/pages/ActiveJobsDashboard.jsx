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
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-1 pt-24">
        <div className="max-w-screen ml-4 mr-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-serif text-blue-600 tracking-wide">
              Active Jobs
            </h1>
            <button
              onClick={() => navigate("/jobs/upload")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Add a New Job
            </button>
          </div>

          {/* <div className="grid gap-6">
            {jobs.map((job, id) => (
              <div
                key={id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-stone-200 hover:border-blue-200 group"
              >
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-2xl font-semibold text-stone-800 group-hover:text-blue-600 transition-colors duration-300">
                        {job.job_title}
                      </h2>
                      <span className="px-4 py-1.5 text-sm font-medium bg-sky-100 text-sky-600 rounded-full border border-sky-200">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-stone-600">
                      <div className="space-y-3">
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            Job Code:
                          </span>
                          <span className="ml-2">{job.job_code}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            Client Bill Rate:
                          </span>
                          <span className="ml-2">${job.client_bill}/hr</span>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            Pay Rate:
                          </span>
                          <span className="ml-2">${job.pay_rate}/hr</span>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            Location:
                          </span>
                          <span className="ml-2">{job.location}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            Created On:
                          </span>
                          <span className="ml-2">
                            {new Date(job.created_at).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                      <div className="space-y-3">
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            Client:
                          </span>
                          <span className="ml-2">{job.client}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            End Client:
                          </span>
                          <span className="ml-2">{job.end_client}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            Client Job ID:
                          </span>
                          <span className="ml-2">{job.job_code}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium text-blue-600 min-w-[140px]">
                            Client Manager:
                          </span>
                          <span className="ml-2">{job.user_id}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l border-stone-200 pl-8">
                    <div className="mb-8">
                      <span className="text-sm font-medium text-stone-500 block mb-3">
                        Priority
                      </span>
                      <div
                        className={`px-4 py-2.5 ${
                          job.priority.toLowerCase() === "high"
                            ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
                            : job.priority.toLowerCase() === "medium"
                            ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                            : "bg-sky-100 text-sky-600 hover:bg-sky-200"
                        } rounded-lg text-center font-medium border border-pink-200  transition-colors duration-300`}
                      >
                        {job.priority}
                      </div>
                    </div>
                    <div className="mb-4 border-t border-stone-200"></div>
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate(`/jobs/edit/${job.job_id}`)}
                        className="w-full px-4 py-3 bg-violet-100 text-violet-600 rounded-lg hover:bg-violet-200 transition-colors duration-300 font-medium border border-violet-200 shadow-sm hover:shadow"
                      >
                        Edit Job
                      </button>

                      <button
                        onClick={() => {
                          handleDelete(job.job_id);
                        }}
                        className="w-full px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-300 font-medium border border-red-200 shadow-sm hover:shadow"
                      >
                        Delete Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <div className="grid grid-cols-12 md:grid-cols-12 gap-4 bg-white shadow-md rounded-lg p-4 items-center justify-center m-0">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Select</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Job Code</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Job Title</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700 text-nowrap">
                Client Bill Rate
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Pay Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Location</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Job Status</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Client</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">End Client</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700 text-nowrap">
                Client Job ID
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700 text-nowrap">
                Client Manager
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Priority</p>
            </div>
          </div>
          <div className="mt-4">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="grid grid-cols-11 md:grid-cols-12 gap-4 bg-white shadow-md rounded-lg p-4 mt-4"
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
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.job_title}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.client_bill}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.pay_rate}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.location}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.status}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.client}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.end_client}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.job_code}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
                  <p>{job.user_id}</p>
                </div>
                <div className="text-gray-600  flex items-center justify-center">
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
