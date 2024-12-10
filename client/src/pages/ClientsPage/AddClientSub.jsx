import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstancs";

const AddClientSub = () => {
  const navigate = useNavigate();

  // State variables for form fields
  const [jobCode, setJobCode] = useState("");
  const [JobApplied, setJobApplied] = useState("");
  const [JobLocation, setJobLocation] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientManager, setClientManager] = useState("");
  const [recruitmentManager, setRecruitmentManager] = useState("");
  const [salesManager, setSalesManager] = useState("");
  const [primaryRecruiter, setPrimaryRecruiter] = useState("");
  const [applicantID, setApplicantID] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantLastname, setApplicantLastname] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantMobile, setApplicantMobile] = useState("");
  const [applicantLocation, setApplicantLocation] = useState("");
  const [status, setStatus] = useState("");
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        jobCode,
        JobApplied,
        JobLocation,
        clientId,
        clientName,
        clientManager,
        recruitmentManager,
        salesManager,
        primaryRecruiter,
        applicantID,
        applicantName,
        applicantLastname,
        applicantEmail,
        applicantMobile,
        status,
      };
      console.log(formData);

      // Replace with your actual API endpoint
      const response = await axiosInstance.post(
        "/add_client_submissions",
        formData
      );

      // Handle successful submission
      console.log("Applicant added successfully", response.data);
      navigate("/Clients-Submission");
    } catch (error) {
      console.error("Error adding applicant:", error);
      // Optionally, show error message to user
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-blue-600 tracking-wide mb-8">
          Add Applicant
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Job Information Section */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Job Code
                </label>
                <input
                  type="text"
                  value={jobCode}
                  onChange={(e) => setJobCode(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter job code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Job Applied
                </label>
                <input
                  type="text"
                  value={JobApplied}
                  onChange={(e) => setJobApplied(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter job applied"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Job Location
                </label>
                <input
                  type="text"
                  value={JobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter job location"
                  required
                />
              </div>

              {/* Client Information Section */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Client Job ID
                </label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter client job ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter client name"
                />
              </div>

              {/* Managers Section */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Client Manager
                </label>
                <input
                  type="text"
                  value={clientManager}
                  onChange={(e) => setClientManager(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter client manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Recruitment Manager
                </label>
                <input
                  type="text"
                  value={recruitmentManager}
                  onChange={(e) => setRecruitmentManager(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter recruitment manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Sales Manager
                </label>
                <input
                  type="text"
                  value={salesManager}
                  onChange={(e) => setSalesManager(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter sales manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Primary Recruiter
                </label>
                <input
                  type="text"
                  value={primaryRecruiter}
                  onChange={(e) => setPrimaryRecruiter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter primary recruiter"
                />
              </div>

              {/* Applicant Information Section */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Applicant ID
                </label>
                <input
                  type="text"
                  value={applicantID}
                  onChange={(e) => setApplicantID(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter applicant ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Applicant Name
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter applicant first name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Applicant Last Name
                </label>
                <input
                  type="text"
                  value={applicantLastname}
                  onChange={(e) => setApplicantLastname(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter applicant last name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Applicant Location
                </label>
                <input
                  type="text"
                  value={applicantLocation}
                  onChange={(e) => setApplicantLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter applicant location"
                />
              </div>

              {/* Contact Information Section */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={applicantMobile}
                  onChange={(e) => setApplicantMobile(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              {/* Status Section */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    console.log(status);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/Applicants")}
                className="px-6 py-3 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Add Applicant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClientSub;
