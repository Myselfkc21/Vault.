import React from "react";
import axiosInstance from "../utils/axiosInstancs";

const NavBar = ({ user }) => {
  return (
    <nav className="fixed w-full bg-gray-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="bg-gray-800">
              <img
                className="h-16 w-36 mix-blend-multiply"
                src="https://whitstack.com/logo.jpg"
                alt=""
              />
            </div>

            <div className="flex items-center">
              <h1 className="text-2xl font-serif text-white tracking-wider">
                Staffing<span className="text-sky-400">.</span>
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a
                href="/dashboard"
                className="text-gray-300 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Dashboard
              </a>
              <a
                href="/All_documents"
                className="text-gray-300 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                All Documents
              </a>

              <a
                href="/jobs"
                className="text-gray-300 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Jobs
              </a>
              <a
                href="/Applicants"
                className="text-gray-300 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Applicants
              </a>
              <a
                href="/Clients-Submission"
                className="text-gray-300 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Clients
              </a>
              <a
                href="/recruiters"
                className="text-gray-300 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Vendors
              </a>
            </div>
          </div>

          {/* Profile/Logout Section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"></button>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-blue-600 transition-colors duration-300">
                <div
                  alt="profile"
                  className="w-auto h-auto p-2 flex items-center justify-center rounded-full border border-gray-600 bg-white"
                >
                  <h2 className="text-xl text-black">
                    {user
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </h2>
                </div>
                <span className="font-medium">{user}</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-gray-600 invisible group-hover:visible transition-all duration-300">
                <div className="py-1">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 hover:text-blue-600"
                  >
                    Profile
                  </a>
                  <button
                    onClick={() => {
                      // Handle logout here
                      axiosInstance.post("/logout").then(() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                      });
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
/******  f700b241-cd19-4881-9beb-c08447fb6310  *******/

export default NavBar;
