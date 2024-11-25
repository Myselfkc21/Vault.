import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstancs";
import { useNavigate } from "react-router-dom";
const UploadPage = () => {
  const navigate = useNavigate();
  const [filename, setFileName] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [filetype, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmits = async () => {
    if (!file || !filename || !shortdescription || !filetype) {
      setUploadStatus({
        error: true,
        message: "Please fill in all fields and select a file",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("filename", filename);
      formData.append("shortdescription", shortdescription);
      formData.append("filetype", filetype);
      formData.append("file", file);

      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus({ error: false, message: "File uploaded successfully!" });
      // Reset form
      setFileName("");
      setShortDescription("");
      setFileType("");
      setFile(null);
      navigate("/All_documents");
    } catch (error) {
      setUploadStatus({
        error: true,
        message: error.response?.data?.message || "Error uploading file",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    // if (
    //   file.type === "application/pdf" ||
    //   file.type === "application/msword" ||
    //   file.type ===
    //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    // ) {
    setFile(file);
    setFileType(file.type.split("/")[1].toUpperCase());
    setFileName(file.name.split(".")[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-emerald-800/10 rounded-full blur-3xl animate-pulse -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 bg-stone-800/10 rounded-full blur-3xl animate-pulse -bottom-20 -right-20"></div>

      <div className="max-w-xl w-full p-8 bg-stone-900/40 backdrop-blur-xl rounded-[1.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-emerald-900/30 relative group hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-500">
        <div className="text-center mb-8 relative">
          <h2 className="text-4xl font-serif tracking-tight text-stone-200">
            Upload Document
          </h2>
          <p className="text-emerald-100/70 mt-2 font-light tracking-widest uppercase text-xs">
            Share your files securely
          </p>
          {isUploading && (
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-emerald-700 to-stone-700 rounded-full opacity-100 animate-spin"></div>
          )}
        </div>

        {uploadStatus && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              uploadStatus.error
                ? "bg-red-900/20 text-red-200"
                : "bg-emerald-900/20 text-emerald-200"
            }`}
          >
            {uploadStatus.message}
          </div>
        )}

        <div className="space-y-6">
          <div
            className={`border-2 border-dashed ${
              dragActive ? "border-emerald-500" : "border-emerald-800/30"
            } rounded-xl p-6 text-center hover:border-emerald-700/50 transition-colors duration-300 cursor-pointer group/upload`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="hidden"
              id="file-upload"
              //   accept=".doc,.docx,.pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                setFile(file);
                setFileType(file.type.split("/")[1].toUpperCase());
                setFileName(file.name.split(".")[0]);
              }}
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <svg
                className="w-12 h-12 mx-auto text-emerald-700/50 group-hover/upload:text-emerald-600/70 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-3 text-stone-300 font-serif text-sm">
                {file ? (
                  file.name
                ) : (
                  <>
                    Drag and drop your file here, or{" "}
                    <span className="text-emerald-400">browse</span>
                  </>
                )}
              </p>
              <p className="mt-1 text-stone-400 text-xs">
                Supported formats: DOC, DOCX, PDF
              </p>
            </label>
          </div>

          <div className="space-y-3">
            <div className="group/input">
              <label
                htmlFor="filename"
                className="block text-xs font-serif text-stone-300 mb-1 tracking-wide"
              >
                File Name
              </label>
              <input
                type="text"
                id="filename"
                value={filename}
                className="block w-full px-4 py-3 bg-stone-800/30 border border-emerald-900/30 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 hover:bg-stone-800/40"
                placeholder="Enter file name"
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            <div className="group/input">
              <label
                htmlFor="shortDescription"
                className="block text-xs font-serif text-stone-300 mb-1 tracking-wide"
              >
                Short Description
              </label>
              <input
                type="text"
                id="shortdescription"
                value={shortdescription}
                className="block w-full px-4 py-3 bg-stone-800/30 border border-emerald-900/30 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 hover:bg-stone-800/40"
                placeholder="Enter short description"
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>
            <div className="group/input">
              <label
                htmlFor="fileType"
                className="block text-xs font-serif text-stone-300 mb-1 tracking-wide"
              >
                File Type
              </label>
              <input
                type="text"
                id="filetype"
                value={filetype}
                className="block w-full px-4 py-3 bg-stone-800/30 border border-emerald-900/30 rounded-lg text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 hover:bg-stone-800/40"
                placeholder="Enter file type"
                onChange={(e) => setFileType(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmits}
              disabled={isUploading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-emerald-800 to-stone-800 rounded-lg text-stone-200 font-serif tracking-wide hover:from-emerald-700 hover:to-stone-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-emerald-900/25 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 active:scale-[0.98] ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
