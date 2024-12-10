import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";

const AllDocuments = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState("A");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handlePinned = async (file_id) => {
    console.log(file_id);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.post("/search", {
        searchTerm,
      });
      setFiles(response.data.files);
      if (response.data.files.length === 0) {
        setError("No files found");
      }
      if (searchTerm.length <= 0) {
        window.location.reload();
      }
      console.log(response);
    } catch (error) {
      console.error(
        "Search failed:",
        error.response?.data?.message || "Failed to search files"
      );
      setError(error.response?.data?.message || "Failed to search files");
    }
  };

  const getUser = async () => {
    const response = await axiosInstance.get("/get_user");
    setUser(response.data.user.fullname);
  };

  const handleDownload = async (file_id) => {
    try {
      const response = await axiosInstance.get(`/files/${file_id}`, {
        responseType: "blob",
      });
      console.log(response);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "downloaded_file";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }

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
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/get_all_files");
        console.log("response", response.data.files);
        setFiles(response.data.files);
        await getUser();
      } catch (error) {
        console.error("Failed to fetch files:", error);
        setError("Failed to load documents");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, []);

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center pt-16">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  return (
    <div>
      <NavBar user={user} />

      {isLoading ? (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-100 p-8 pt-24 opacity-50 pointer-events-none">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-100 p-8 pt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-serif text-slate-800">
                Your Documents
              </h1>
              <button
                onClick={handleUpload}
                className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 font-serif"
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

            {error && (
              <div className="text-center py-12 text-red-500">{error}</div>
            )}

            {files.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-700 text-xl font-serif">
                  Welcome! Please upload a file to get started.
                </p>
                <p className="text-slate-500 mt-2">
                  Click the "Upload Document" button above to begin.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {files.map((file, id) => (
                  <div
                    key={id}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 hover:bg-white transition-all duration-300 group hover:shadow-xl hover:shadow-blue-100 border border-blue-100 hover:border-blue-300"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-sky-50 rounded-xl group-hover:from-blue-200 group-hover:to-sky-100 transition-all duration-300 shadow-inner">
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
                          <h3 className="text-lg font-serif text-slate-800 group-hover:text-blue-600 transition-colors duration-300 tracking-wide">
                            {file.file_name}
                          </h3>
                          <p className="text-sm text-slate-500 font-light tracking-wide mt-1">
                            {Math.floor(file.file_size / 1024)}MB •{" "}
                            {file.file_type} Document
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handlePinned(file.file_id)}
                          className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-105"
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
                          className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-105"
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
                          className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-105"
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
                      <span className="text-sm text-slate-500 font-light tracking-wide bg-slate-100 px-3 py-1 rounded-full">
                        Uploaded on {formatDate(file.uploaded_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDocuments;
