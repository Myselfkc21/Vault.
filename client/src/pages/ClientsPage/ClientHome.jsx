import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axiosInstance from "../../utils/axiosInstancs";
import { useNavigate } from "react-router-dom";

const ClientHome = () => {
  const navigate = useNavigate();
  const columns = [
    "Select",
    "No",
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
    "Applicant Last Name",
    "Applicant Location",
    "Email Address",
    "Mobile",
    "Status",
  ];

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axiosInstance.get("/get_client_submissions");
        setApplicants(response.data.clients);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchApplicants();
  }, []);

  const isLoading = false;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar user={"k"}></NavBar>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 mt-16">
          <div className="flex justify-between mb-3">
            <h1 className="text-4xl font-bold text-black mb-4">
              All Applicants
            </h1>
            <div className="flex items-center">
              <button
                onClick={() => navigate("/add-applicant")}
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
                          onClick={() => {
                            console.log(applicant.clientsubmission_id);
                            navigate(`edit/${applicant.clientsubmission_id}`);
                          }}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.job_code}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.job_applied}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.job_location}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.client_id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.client_name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.client_manager}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.recruitment_manager}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.sales_manager}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.primary_recruiter}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.applicant_id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.applicant_name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.applicant_lastname}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.job_location}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.email_address}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.mobile}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.applicant_location}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {applicant.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
