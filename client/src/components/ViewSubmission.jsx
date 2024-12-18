import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";

const ViewSubmission = ({ id }) => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);
  const [applicantStatus, setApplicantStatus] = useState("");
  const navigate = useNavigate();
  const applicationStatuses = [
    "Client Submission",
    "Submission",
    "Interview Scheduled",
    "Active Jobs",
    "Client Served Jobs",
  ];
  const jobId = id;
  console.log("jobId", jobId);
  const fetchSubmissions = async () => {
    try {
      const response = await axiosInstance.get(`/get-submission/${jobId}`);

      setSubmissions(response.data.submissions);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch submissions");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSubmissions();
  }, [jobId]);

  const handleSaveSubmission = async (id) => {
    console.log("submissionId", applicantStatus);
    const submissionId = id;

    try {
      const response = await axiosInstance.put(
        `/update-status/${submissionId}`,
        { applicantStatus }
      );
      console.log(response);
      setApplicantStatus(response);
      fetchSubmissions();
    } catch (error) {
      console.log(error);
    }
    // navigate(`/edit-submission/${submissionId}`);
  };

  const renderSubmissionCard = (submission) => (
    <div
      key={submission.id}
      className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Full Name</p>
          <p className="text-lg font-semibold">{submission.full_name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Email</p>
          <p>{submission.email_address}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Contact Number</p>
          <p>{submission.contact_number}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">
            Work Authorization
          </p>
          <p>{submission.work_authorization}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Pay Rate</p>
          <p>${submission.pay_rate}/hr</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Client Bill Rate</p>
          <p>${submission.client_bill}/hr</p>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm font-medium text-gray-600">
            Application Status
          </p>
          {!status ? (
            <span
              className={`
              inline-block px-3 py-1 rounded-full text-sm font-medium
              ${getStatusColor(submission.application_status)}
            `}
            >
              {submission.application_status}
            </span>
          ) : (
            <select
              id="applicationStatus"
              name="applicationStatus"
              // value={submission.application_status}
              onChange={(e) => {
                setApplicantStatus(e.target.value);
                console.log("status", e.target.value);
              }}
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
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        {status ? (
          <button
            onClick={() => {
              setStatus(!status);
              handleSaveSubmission(submission.submission_id);
              console.log("submissionId", submission.submission_id);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            save
          </button>
        ) : (
          <button
            onClick={() => setStatus(!status)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Edit
          </button>
        )}

        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => handleDeleteSubmission(submission.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Client Submission":
        return "bg-yellow-100 text-yellow-800";
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Active Jobs":
        return "bg-green-100 text-green-800";
      case "Client Served Jobs":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteSubmission = async (submissionId) => {
    try {
      await axiosInstance.delete(`/submission/${submissionId}`);
      setSubmissions(submissions.filter((sub) => sub.id !== submissionId));
    } catch (err) {
      console.error("Failed to delete submission", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
        <button
          onClick={() => navigate("/jobs")}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Submissions</h1>
        </div>
        {Array.isArray(submissions) && submissions.length > 0 ? (
          submissions.map(renderSubmissionCard)
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No submissions found for this job.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSubmission;
