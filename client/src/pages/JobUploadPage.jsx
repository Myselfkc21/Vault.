import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";
const JobUploadPage = () => {
  const navigate = useNavigate();
  const [job_title, setJobTitle] = useState("");
  const [client_bill, setClientBill] = useState("");
  const [pay_rate, setPayRate] = useState("");
  const [client, setClient] = useState("");
  const [end_client, setEndClient] = useState("");
  const [location, setLocation] = useState("");
  const [Status, setStatus] = useState("");
  const [job_description, setJobDescription] = useState("");
  const [job_code, setJobCode] = useState("");
  const [priority, setPriority] = useState("");
  const [user, setUser] = useState("A");
  const [JobStatus, SetJobStatus] = useState("");
  const getUser = async () => {
    const response = await axiosInstance.get("/get_user");
    setUser(response.data.user.id);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/upload_jobs", {
        user_id: user,
        job_title: job_title || "Enter Job Title",
        client_bill: client_bill || "Enter Client Bill Rate",
        pay_rate: pay_rate || "Enter Pay Rate",
        client: client || "Enter Client",
        end_client: end_client || "Enter End Client",
        location: location || "Enter Location",
        status: Status || "Enter Status",
        job_description: job_description || "Enter Job Description",
        job_code: job_code || "Enter Job Code",
        priority: priority || "Enter Priority",
        job_status: JobStatus || "Enter the job status",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-blue-600 tracking-wide mb-8">
          Add New Job
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Job Title
                </label>
                <input
                  value={job_title}
                  onChange={(e) => setJobTitle(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Job Code
                </label>
                <input
                  value={job_code}
                  onChange={(e) => setJobCode(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="e.g. JC-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Client Bill Rate ($/hr)
                </label>
                <input
                  value={client_bill}
                  onChange={(e) => setClientBill(e.target.value)}
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="e.g. 150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Pay Rate ($/hr)
                </label>
                <input
                  value={pay_rate}
                  onChange={(e) => setPayRate(e.target.value)}
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="e.g. 120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Client
                </label>
                <input
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="e.g. Tech Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  End Client
                </label>
                <input
                  value={end_client}
                  onChange={(e) => setEndClient(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="e.g. Finance Co"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="e.g. New York, NY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Status
                </label>
                <select
                  onChange={(e) => {
                    setStatus(e.target.value);
                    console.log(e.target.value);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Priority
                </label>
                <select
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Job Status
                </label>
                <select
                  onChange={(e) => {
                    SetJobStatus(e.target.value);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                >
                  <option value="Active">Active</option>
                  <option value="Not Active">Not Active</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-2">
                Job Description
              </label>
              <textarea
                value={job_description}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300 h-32"
                placeholder="Enter detailed job description..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="px-6 py-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSubmit();
                  navigate("/jobs");
                }}
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobUploadPage;
