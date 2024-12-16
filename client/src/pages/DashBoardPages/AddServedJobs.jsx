import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstancs";
import { useNavigate } from "react-router-dom";

const AddServedJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_title: "",
    client_bill: "",
    location: "",
    job_status: "",
    client: "",
    end_client: "",
    client_job_id: "",
    client_manager: "",
    priority: "",
    duration: "",
    no_of_positions: "",
    sales_manager: "",
    recruitment_manager: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/add_served_jobs", formData);
      alert("Served Job added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to add job. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12  px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl outline-double outline-blue-200 overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="mb-10">
            <h2 className="text-4xl font-semibold text-gray-900 text-center">
              Add New Served Job
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Fill in the details for the new job opportunity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "job_title", label: "Job Title", type: "text" },
                { name: "client_bill", label: "Client Bill", type: "text" },
                { name: "location", label: "Location", type: "text" },
                { name: "job_status", label: "Job Status", type: "text" },
                { name: "client", label: "Client", type: "text" },
                { name: "end_client", label: "End Client", type: "text" },
                { name: "client_job_id", label: "Client Job ID", type: "text" },
                {
                  name: "client_manager",
                  label: "Client Manager",
                  type: "text",
                },
                { name: "priority", label: "Priority", type: "text" },
                { name: "duration", label: "Duration", type: "text" },
                {
                  name: "no_of_positions",
                  label: "# of Positions",
                  type: "number",
                },
                { name: "sales_manager", label: "Sales Manager", type: "text" },
                {
                  name: "recruitment_manager",
                  label: "Recruitment Manager",
                  type: "text",
                },
              ].map(({ name, label, type }) => (
                <div key={name} className="relative">
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                      transition duration-300 ease-in-out 
                      placeholder-gray-400 text-gray-900"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2.5 bg-gray-100 text-gray-800 font-semibold 
                  rounded-lg hover:bg-gray-200 transition duration-300 
                  border border-gray-300 shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold 
                  rounded-lg hover:bg-indigo-700 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                  transition duration-300 shadow-lg"
              >
                Submit Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServedJobPage;
