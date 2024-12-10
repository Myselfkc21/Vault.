import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axiosInstance from "../utils/axiosInstancs";
import { useNavigate } from "react-router-dom";

const Applicants = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("A");
  const getUser = async () => {
    const response = await axiosInstance.get("/get_user");
    setUser(response.data.user.fullname);
  };

  useEffect(() => {
    getUser();
  }, []);
  const HandleSelects = (id) => {
    console.log("line 13", id);
    navigate(`/Applicants/${id}`);
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/get_aplicant_submissions`);
        setApplicants(response.data.applicantsubmissions);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const columns = [
    "select",
    "ID",
    "Job Code",
    "Job Applied",
    "Job Location",
    "Client Job ID",
    "Client Name",
    "Client Manager",
    "Recruitment Manager",
    "Sales Manager",
    "Primary Recruiter",
    "Applicant ID",
    "Applicant Name",
    "Applicant Location",
  ];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-600">
        <p className="text-xl font-semibold">
          Error loading applicants: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <NavBar user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 mt-16">
          <div className="flex justify-between mb-3">
            <h1 className="text-4xl font-bold text-black mb-4">
              All Applicants
            </h1>
            <div className="flex items-center">
              <button
                onClick={() => navigate("/Applicant-Upload")}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Add Applicant
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
              {/* Desktop View */}
              <table className="w-full hidden md:table">
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
                  {applicants.map((applicant, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-4 flex items-center justify-center whitespace-nowrap text-sm text-gray-700">
                        <input
                          type="checkbox"
                          onChange={() => {
                            HandleSelects(applicant.applicant_id);
                            console.log("hey", applicant.applicant_id);
                          }}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.jobcode}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.jobapplied}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.joblocation}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.clientjobid}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.clientname}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.clientmanager}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.recruitmentmanager}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.salesmanager}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.primaryrecruiter}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.applicantid}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.applicantname}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.applicantlocation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mobile View */}
              <div className="md:hidden">
                {applicants.map((applicant, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 border-b last:border-b-0 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-blue-600">
                        Applicant Name:
                      </span>
                      <span>{applicant.applicantname}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-blue-600">
                        Job Applied:
                      </span>
                      <span>{applicant.jobapplied}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-blue-600">
                        Client Name:
                      </span>
                      <span>{applicant.clientname}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
