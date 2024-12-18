import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";

const AddSubmissions = ({ id }) => {
  const naviagate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    workAuthorization: "",
    email: "",
    contactNumber: "",
    payRate: "",
    clientBillRate: "",
    applicationStatus: "",
    
  });
  const jobId = id;
  console.log(jobId);
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
      const response = await axiosInstance.post(
        `/add_submission/${jobId}`,
        formData
      );
 
      naviagate("/jobs");
    } catch (error) {}
    console.log(formData);
  };

  const applicationStatuses = [
    "Client Submission",
    "Submission",
    "Interview Scheduled",
    "Active Jobs",
    "Client Served Jobs",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden mt-16">
        <div className="px-6 py-10 sm:px-10">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            Add New Submission
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    transition duration-300 ease-in-out"
                  placeholder="Enter full name"
                />
              </div>

              {/* Work Authorization */}
              <div>
                <label
                  htmlFor="workAuthorization"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Work Authorization
                </label>
                <input
                  type="text"
                  id="workAuthorization"
                  name="workAuthorization"
                  value={formData.workAuthorization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    transition duration-300 ease-in-out"
                  placeholder="Enter work authorization"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    transition duration-300 ease-in-out"
                  placeholder="Enter email address"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    transition duration-300 ease-in-out"
                  placeholder="Enter contact number"
                />
              </div>

              {/* Pay Rate */}
              <div>
                <label
                  htmlFor="payRate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pay Rate
                </label>
                <input
                  type="number"
                  id="payRate"
                  name="payRate"
                  value={formData.payRate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    transition duration-300 ease-in-out"
                  placeholder="Enter pay rate"
                />
              </div>

              {/* Client Bill Rate/Salary */}
              <div>
                <label
                  htmlFor="clientBillRate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Client Bill Rate/Salary
                </label>
                <input
                  type="number"
                  id="clientBillRate"
                  name="clientBillRate"
                  value={formData.clientBillRate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    transition duration-300 ease-in-out"
                  placeholder="Enter client bill rate"
                />
              </div>

              {/* Application Status */}
              <div className="md:col-span-2">
                <label
                  htmlFor="applicationStatus"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Application Status
                </label>
                <select
                  id="applicationStatus"
                  name="applicationStatus"
                  value={formData.applicationStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                    transition duration-300 ease-in-out"
                >
                  <option value="">Select Application Status</option>
                  {applicationStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold 
                  rounded-lg hover:bg-indigo-700 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                  transition duration-300 shadow-lg"
              >
                Submit Submission
              </button>
              <button
                onClick={() => naviagate("/jobs")}
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 "
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubmissions;
