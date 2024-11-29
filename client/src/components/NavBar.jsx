import React from "react";
import axiosInstance from "../utils/axiosInstancs";

const NavBar = ({ user }) => {
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-serif text-blue-600 tracking-wider">
              Staffing<span className="text-sky-400">.</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a
                href="/dashboard"
                className="text-stone-600 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Dashboard
              </a>
              <a
                href="/All_documents"
                className="text-stone-600 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                All Documents
              </a>
              <a
                href="/jobs"
                className="text-stone-600 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Active Jobs
              </a>
            </div>
          </div>

          {/* Profile/Logout Section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-stone-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="h-8 w-px bg-stone-200"></div>
            <div className="relative group">
              <button className="flex items-center space-x-2 text-stone-600 hover:text-blue-600 transition-colors duration-300">
                <div
                  alt="profile"
                  className="w-auto h-auto p-2 flex items-center justify-center rounded-full border border-stone-200 bg-blue-50"
                >
                  <h2 className="text-xl text-blue-600">
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
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-stone-200 invisible group-hover:visible transition-all duration-300">
                <div className="py-1">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-stone-600 hover:bg-blue-50 hover:text-blue-600"
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
                    className="block w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-blue-50 hover:text-blue-600"
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

export default NavBar;
