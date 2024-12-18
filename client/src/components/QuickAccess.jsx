import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstancs";
import ApplicantSubmission from "./ApplicantSubmission";
import ServedJobs from "./ServedJobs";
import ActiveJobsDash from "./ActiveJobsDash";

const QuickAccess = () => {
  const [applicant, SetApplicant] = useState([]);
  const [applicants, SetApplicants] = useState([]);
  const [Submission, SetSubmission] = useState(false);
  const [ServedJob, SetServedJob] = useState(false);
  const [SubmissionNumber, setSubmissionNumber] = useState(0);
  const [ClientSub, setClientSub] = useState(0);
  const [interviewScheduled, setInterviewScheduled] = useState(0);
  const [jobs, SetJobs] = useState(false);
  const [ActiveJobs, setActiveJobs] = useState(0);
  const [TotalJobs, setTotalJobs] = useState(0);
  const handleSubmit = async (path) => {
    console.log(path);
    SetSubmission(!Submission);
    try {
      const response = await axiosInstance.get(`/${path}`);

      SetApplicant(response.data.data);
      console.log(applicant);
    } catch (error) {}
  };

  const HandleJobs = async (path) => {
    SetJobs(!jobs);
    SetSubmission(false);
    console.log("hello");
    try {
      const response = await axiosInstance.get(`/${path}`);

      SetApplicants(response.data.data);
      console.log("jobs", applicant);
    } catch (error) {}
  };

  const getData = async () => {
    SetSubmission(!Submission);
    try {
      const response = await axiosInstance.get("/get-submission-numbers");
      const ClientSub = await axiosInstance.get(
        "/get-Client-Submission-numbers"
      );
      const InterviewSchdeuled = await axiosInstance.get(
        "/get-Interview-Scheduled-numbers"
      );
      const ActiveJobs = await axiosInstance.get("/get-Active-Jobs-numbers");
      const Jobs = await axiosInstance.get("/get-Jobs-numbers");
      console.log(response);
      setTotalJobs(Jobs.data.count);
      setActiveJobs(ActiveJobs.data.count);
      setSubmissionNumber(response.data.count);
      setClientSub(ClientSub.data.count);
      setInterviewScheduled(InterviewSchdeuled.data.count);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4 sticky">
        <div
          onClick={(e) => {
            console.log(e);
            SetServedJob(false);
            handleSubmit("get-submission-numbers");
          }}
          className="p-4 bg-yellow-100 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
        >
          <p className="text-center text-2xl font-bold text-yellow-500">
            {SubmissionNumber}
          </p>
          <h2 className="text-lg font-semibold mb-2 text-center text-blue-500">
            Submissions
          </h2>
        </div>
        <div
          onClick={(e) => {
            handleSubmit("get-Client-Submission-numbers");
          }}
          className="p-4 bg-violet-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <p className="text-center text-2xl font-bold text-purple-500">
            {ClientSub}
          </p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Client Submissions
          </h2>
        </div>
        <div
          onClick={(e) => {
            handleSubmit("get-Interview-Scheduled-numbers");
          }}
          className="p-4 bg-green-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <p className="text-center text-2xl font-bold text-green-500">
            {interviewScheduled}
          </p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Interviews Schedules
          </h2>
        </div>
        <div
          onClick={(e) => {
            HandleJobs("get-Jobs-numbers");
          }}
          className="p-4 bg-orange-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <p className="text-center text-2xl font-bold text-orange-500">
            {TotalJobs}
          </p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Jobs
          </h2>
        </div>
        <div
          onClick={(e) => {
            HandleJobs("get-Active-Jobs-numbers");
          }}
          className="p-4 bg-amber-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <p className="text-center text-2xl font-bold text-amber-500">
            {ActiveJobs}
          </p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Active Jobs
          </h2>
        </div>
        <div
          // onClick={(e) => {
          //   SetSubmission(false);
          //   SetServedJob(!ServedJob);
          // }}
          className="p-4 bg-pink-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <p className="text-center text-2xl font-bold text-pink-500">48</p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            #Client Served Jobs
          </h2>
        </div>
        <div className="p-4 bg-indigo-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <p className="text-center text-2xl font-bold text-indigo-500">48</p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Login
          </h2>
        </div>
      </div>
      {Submission === true ? (
        <ApplicantSubmission applicant={applicant} />
      ) : null}
      {jobs === true ? <ActiveJobsDash applicants={applicants} /> : null}
    </>
  );
};

export default QuickAccess;
