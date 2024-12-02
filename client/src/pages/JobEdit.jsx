import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";

const JobEdit = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);

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

  const loadJob = async () => {
    const response = await axiosInstance.get(`/get_to_edit_job/${job_id}`);
    setJobTitle(response.data.jobs[0].job_title);
    setClientBill(response.data.jobs[0].client_bill);
    setPayRate(response.data.jobs[0].pay_rate);
    setClient(response.data.jobs[0].client);
    setEndClient(response.data.jobs[0].end_client);
    setLocation(response.data.jobs[0].location);
    setStatus(response.data.jobs[0].status);
    setJobDescription(response.data.jobs[0].job_description);
    setJobCode(response.data.jobs[0].job_code);
    setPriority(response.data.jobs[0].priority);
  };

  const handleSubmit = async () => {
    const response = await axiosInstance.put(`/update_job/${job_id}`, {
      job_title,
      client_bill,
      pay_rate,
      client,
      end_client,
      location,
      Status,
      job_description,
      job_code,
      priority,
    });
    if (response.status === 200) {
      navigate("/jobs");
    }
  };
  useEffect(() => {
    loadJob();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-blue-600 tracking-wide mb-8">
          Edit Job
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Job Title
                </label>
                <input
                  //   value={job_title}
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
                  placeholder="e.g. 100"
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
                  placeholder="Enter client name"
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
                  placeholder="Enter end client name"
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
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Status
                </label>
                <select
                  value={Status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                >
                  <option value="High">urgent</option>
                  <option value="Medium">normal</option>
                  <option value="Low">Later</option>
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
                placeholder="Enter detailed job description"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSubmit();
                  navigate("/jobs");
                }}
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobEdit;
