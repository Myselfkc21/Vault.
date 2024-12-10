import axios from "axios";
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstancs";
import ApplicantSubmission from "./ApplicantSubmission";
import ServedJobs from "./ServedJobs";

const QuickAccess = () => {
  const [applicant, SetApplicant] = useState([]);
  const [Submission, SetSubmission] = useState(false);
  const [ServedJob, SetServedJob] = useState(false);
  const handleSubmit = async () => {
    SetSubmission(!Submission);
    try {
      const response = await axiosInstance.get("/get_aplicant_submissions");
      SetApplicant(response.data.applicantsubmissions);
      console.log(response);
    } catch (error) {}
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4 sticky">
        <div
          onClick={(e) => {
            console.log(e);
            SetServedJob(false);
            handleSubmit();
          }}
          className="p-4 bg-yellow-100 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
        >
          <p className="text-center text-2xl font-bold text-yellow-500">48</p>
          <h2 className="text-lg font-semibold mb-2 text-center text-blue-500">
            Submissions
          </h2>
        </div>
        <div className="p-4 bg-violet-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <p className="text-center text-2xl font-bold text-purple-500">48</p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Client Submissions
          </h2>
        </div>
        <div className="p-4 bg-green-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <p className="text-center text-2xl font-bold text-green-500">48</p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Interviews Schedules
          </h2>
        </div>
        <div className="p-4 bg-orange-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <p className="text-center text-2xl font-bold text-orange-500">48</p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Jobs
          </h2>
        </div>
        <div className="p-4 bg-amber-200 items-center justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <p className="text-center text-2xl font-bold text-amber-500">48</p>
          <h2 className="text-lg font-semibold mb-2 text-center text-black">
            Active Jobs
          </h2>
        </div>
        <div
          onClick={(e) => {
            SetSubmission(false);
            SetServedJob(!ServedJob);
          }}
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
      {ServedJob === true ? <ServedJobs /> : null}
    </>
  );
};

export default QuickAccess;
