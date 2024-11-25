import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";

const DashBoard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState("A");
  const [pinnedFiles, setPinnedFiles] = useState([]);
  const handlePinned = async (file_id) => {
    console.log(file_id);
  };
  const getUser = async () => {
    const response = await axiosInstance.get("/get_user");
    setUser(response.data.user.fullname);
  };
  const handleDownload = async (file_id) => {
    try {
      const response = await axiosInstance.get(`/files/${file_id}`, {
        responseType: "blob", // Critical for downloading binary data
      });
      console.log(response);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "downloaded_file";

      // Extract file name from Content-Disposition header
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }

      // Create a URL for the Blob and trigger download
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("File download failed:", error);
    }
  };
  const handleUpload = async () => {
    try {
      navigate("/dashboard/upload");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (file_id) => {
    console.log(file_id);
    try {
      const response = await axiosInstance.delete(`/files/${file_id}`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }
  useEffect(() => {
    const fetchFiles = async () => {
      const response = await axiosInstance.get("/files");
      console.log("hi");
      console.log("response", response.data.files);
      setFiles(response.data.files);
      getUser();
    };
    fetchFiles();
  }, []);
  return (
    <div>
      <NavBar user={user} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-serif text-stone-200">
              Your Documents
            </h1>
            <button
              onClick={handleUpload}
              className="flex items-center px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-stone-200 rounded-lg transition-colors duration-300 font-serif"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Upload Document
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* File Card Component */}
            {files.map((file, id) => (
              <div
                key={id}
                className="bg-gradient-to-br from-stone-900/80 to-stone-900/60 backdrop-blur-xl rounded-2xl p-6 hover:from-stone-800/80 hover:to-stone-800/60 transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-900/40 border border-emerald-800/20 hover:border-emerald-700/30"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 rounded-xl group-hover:from-emerald-800/40 group-hover:to-emerald-700/30 transition-all duration-300 shadow-inner">
                      <svg
                        className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transform group-hover:scale-110 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-stone-100 group-hover:text-emerald-300 transition-colors duration-300 tracking-wide">
                        {file.file_name}
                      </h3>
                      <p className="text-sm text-stone-400 font-light tracking-wide mt-1">
                        {Math.floor(file.file_size / 1024)}MB • {file.file_type}{" "}
                        Document
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handlePinned(file.file_id)}
                      className="p-2.5 text-stone-400 hover:text-emerald-300 hover:bg-emerald-900/30 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDownload(file.file_id)}
                      className="p-2.5 text-stone-400 hover:text-emerald-300 hover:bg-emerald-900/30 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(file.file_id)}
                      className="p-2.5 text-stone-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-500 font-light tracking-wide bg-stone-800/40 px-3 py-1 rounded-full">
                    Uploaded on {formatDate(file.uploaded_at)}
                  </span>
                </div>
              </div>
            ))}
            {/* Repeat similar structure for other files with improved hover states and interactions */}
            {/* Additional file cards would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
