import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstancs";
import { useNavigate, useParams } from "react-router-dom";

const ApplicantEdit = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState();
  const applicant_id = useParams().id;
  const [AppliantName, setAppliantName] = useState("");
  const [JobApplied, setJobApplied] = useState("");
  const [Joblocation, setJobLocation] = useState("");
  const [status, setStatus] = useState("");
  const [jobCode, setJobCode] = useState("");
  const [clientJobId, setClientJobId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientManager, setClientManager] = useState("");
  const [RecruitmentManager, setRecruitmentManager] = useState("");
  const [SalesManager, setSalesManager] = useState("");
  const [PrimaryRecruiter, setPrimaryRecruiter] = useState("");

  const [ApplicantLoaction, setApplicantLocation] = useState("");
  console.log("applicants", applicants);

  const fetchApplicants = async () => {
    try {
      const response = await axiosInstance.get(
        `/get_selected_applicant_data/${applicant_id}`
      );
      const applicantData = response.data.applicantsubmissions[0];
      setApplicants(applicantData);
      setAppliantName(applicantData.applicantname);
      setJobApplied(applicantData.jobapplied);
      setJobLocation(applicantData.joblocation);
      setStatus(applicantData.status);
      setJobCode(applicantData.jobcode);
      setClientJobId(applicantData.clientjobid);
      setClientName(applicantData.clientname);
      setClientManager(applicantData.clientmanager);
      setRecruitmentManager(applicantData.recruitmentmanager);
      setSalesManager(applicantData.salesmanager);
      setPrimaryRecruiter(applicantData.primaryrecruiter);
      setApplicantLocation(applicantData.applicantlocation);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };
  const handleUpdate = async () => {
    console.log("clicked");

    try {
      const response = await axiosInstance.put(
        `/update_applicant_submissions/${applicant_id}`,
        {
          JobApplied,
          Joblocation,
          jobCode,
          clientJobId,
          clientName,
          clientManager,
          RecruitmentManager,
          SalesManager,
          PrimaryRecruiter,
          ApplicantLoaction,
          AppliantName,
        }
      );
      console.log("updated responsed", response);
      navigate(`/Applicants`);
    } catch (error) {
      console.log("Error updating applicant:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const respose = await axiosInstance.delete(
        `/delete_applicant_submissions/${applicant_id}`
      );
      console.log(respose);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-blue-600 tracking-wide mb-8">
          Edit Applicant
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Applicant Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter applicant name"
                  value={AppliantName}
                  onChange={(e) => {
                    setAppliantName(e.target.value);
                    console.log("NAEs DOAW", AppliantName);
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Job Applied
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter job applied"
                  value={JobApplied}
                  onChange={(e) => setJobApplied(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter location"
                  value={Joblocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

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
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Client Job ID
                </label>
                <input
                  type="text"
                  value={clientJobId}
                  onChange={(e) => setClientJobId(e.target.value)}
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
                  onChange={(e) => {
                    setClientName(e.target.value);
                    console.log("clientna,e", clientName);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter client name"
                />
              </div>

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
                  value={RecruitmentManager}
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
                  value={SalesManager}
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
                  value={PrimaryRecruiter}
                  onChange={(e) => setPrimaryRecruiter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter primary recruiter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Applicant ID
                </label>
                <input
                  type="text"
                  value={applicant_id}
                  onChange={(e) => setApplicantId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter applicant ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Applicant Location
                </label>
                <input
                  type="text"
                  value={ApplicantLoaction}
                  onChange={(e) => {
                    setApplicantLocation(e.target.value);
                    console.log(ApplicantLoaction);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
                  placeholder="Enter applicant location"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/Applicants")}
                className="px-6 py-3 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => {
                  handleUpdate();
                  navigate("/Applicants");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Update Applicant
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  navigate("/Applicants");
                }}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicantEdit;
