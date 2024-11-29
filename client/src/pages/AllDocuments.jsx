import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axiosInstance from "../utils/axiosInstancs";

const AllDocuments = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [error, setError] = useState(null);
  const [user, setUser] = useState("A");

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

  const handlePinned = async (file_id, currentPinned) => {
    try {
      const response = await axiosInstance.post("/pin_file", {
        file_id,
        pinned: !currentPinned // Toggle the current pinned state
      });
      
      if (response.status === 200) {
        // Update the files state to reflect the new pinned status
        setFiles(files.map(file => {
          if (file.file_id === file_id) {
            return { ...file, pinned: !file.pinned };
          }
          return file;
        }));
      }
    } catch (error) {
      console.error("File pinning failed:", error);
      setError(error.response?.data?.message || "Failed to pin file");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.post("/search", {
        searchTerm,
      });
      setFiles(response.data.files);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    // Fetch files logic would go here
    const fetchFiles = async () => {
      const response = await axiosInstance.get("/get_all_files");
      setFiles(response.data.files);
      console.log(response.data.files);
    };
    fetchFiles();
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-100">
      <NavBar user={user} />

      <div className="pt-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif text-slate-800 tracking-tight mb-2">
              Document Library
            </h1>
            <p className="text-blue-600/70 font-light tracking-widest uppercase text-xs">
              All your important files in one place
            </p>
          </div>

          <div className="mt-6 md:mt-0 relative">
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-3 bg-white/80 border border-blue-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 w-72"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value.toLocaleLowerCase());
                handleSearch();
              }}
            />
            <svg
              className="w-5 h-5 text-slate-400 absolute left-3 top-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, id) => (
            <div
              key={id}
              className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-all duration-500 border border-blue-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-sky-50 rounded-xl group-hover:from-blue-200 group-hover:to-sky-100 transition-all duration-300">
                    <svg
                      className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transform group-hover:scale-110 transition-all duration-300"
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
                    <h3 className="text-lg font-serif text-slate-700 group-hover:text-blue-600 transition-colors duration-300">
                      {file.file_name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 font-light">
                      {Math.floor(file.file_size / 1024)}MB • {file.file_type}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePinned(file.file_id, file.pinned);
                      }}
                      className={`p-2 ${
                        file.pinned
                          ? "text-blue-500 bg-blue-100"
                          : "text-slate-400"
                      } hover:bg-blue-100 rounded-lg transition-all duration-300`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={file.pinned ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file.file_id);
                    }}
                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-100 rounded-lg transition-all duration-300"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDocuments;
