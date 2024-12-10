import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";
import QuickAccess from "../components/QuickAccess";

const DashBoard = () => {
  const [user, setUser] = useState("A");
  const getUser = async () => {
    const response = await axiosInstance.get("/get_user");
    setUser(response.data.user.fullname);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="dashboard-container">
      <NavBar user={user} />

      <div className="dashboard-content bg-gradient-to-br from-sky-100 via-blue-50 to-sky-100 p-8 pt-24">
        <div className="dashboard-header">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome, {user}!
          </h1>
          <p className="text-lg text-slate-600">Your personalized dashboard.</p>
        </div>
        <QuickAccess></QuickAccess>
      </div>
    </div>
  );
};

export default DashBoard;
