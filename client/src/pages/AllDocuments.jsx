import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axiosInstance from "../utils/axiosInstancs";

const AllDocuments = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [pinned, setPinned] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("A");

  const getUser = async () => {
    const response = await axiosInstance.get("/get_user");
    setUser(response.data.user);
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

  const handlePinned = async (file_id) => {
    console.log(file_id);
    try {
      const response = await axiosInstance.post("/pin_file", {
        file_id,
        pinned,
      });
      console.log("helloo", response);
      if (response.status === 200) {
        setPinned(!pinned);
      }
    } catch (error) {
      console.error("File pinning failed:", error);
    }
    setError(error.response.data.message);
  };

  useEffect(() => {
    // Fetch files logic would go here
    const fetchFiles = async () => {
      const response = await axiosInstance.get("/get_all_files");
      setFiles(response.data.files);
      console.log(response.data.files);
    };
    fetchFiles();
  }, [pinned]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-emerald-950 to-stone-950">
      <NavBar user={user} />

      <div className="pt-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif text-stone-100 tracking-tight mb-2">
              Document Library
            </h1>
            <p className="text-emerald-300/70 font-light tracking-widest uppercase text-xs">
              All your important files in one place
            </p>
          </div>

          <div className="mt-6 md:mt-0 relative">
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-3 bg-stone-900/50 border border-emerald-800/30 rounded-xl text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="w-5 h-5 text-stone-500 absolute left-3 top-3.5"
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
              className="group bg-stone-900/40 backdrop-blur-xl rounded-2xl p-6 hover:bg-stone-800/50 transition-all duration-500 border border-emerald-900/20 hover:border-emerald-700/30 hover:shadow-lg hover:shadow-emerald-900/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-900/30 to-stone-900/30 rounded-xl group-hover:from-emerald-800/40 group-hover:to-stone-800/40 transition-all duration-300">
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
                    <h3 className="text-lg font-serif text-stone-100 group-hover:text-emerald-100 transition-colors duration-300">
                      {file.file_name}
                    </h3>
                    <p className="text-sm text-stone-400 mt-1 font-light">
                      {Math.floor(file.file_size / 1024)}MB • {file.file_type}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div>
                    <button
                      onClick={(e) => {
                        // e.stopPropagation();
                        handlePinned(file.file_id);
                      }}
                      className={`p-2 ${
                        file.pinned
                          ? "text-emerald-300 bg-emerald-900/30"
                          : "text-stone-400"
                      } hover:bg-emerald-900/30 rounded-lg transition-all duration-300`}
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
                    className="p-2 text-stone-400 hover:text-emerald-300 hover:bg-emerald-900/30 rounded-lg transition-all duration-300"
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
