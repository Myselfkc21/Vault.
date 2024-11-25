import React from "react";

const NavBar = ({ user }) => {
  return (
    <nav className="fixed w-full bg-stone-900/90 backdrop-blur-sm border-b border-emerald-800/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-serif text-stone-100 tracking-wider">
              Vault<span className="text-emerald-400">.</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a
                href="/dashboard"
                className="text-stone-300 hover:text-emerald-300 font-serif transition-colors duration-300"
              >
                Dashboard
              </a>
              <a
                href="/All_documents"
                className="text-stone-300 hover:text-emerald-300 font-serif transition-colors duration-300"
              >
                All Documents
              </a>
              <a
                href="/settings"
                className="text-stone-300 hover:text-emerald-300 font-serif transition-colors duration-300"
              >
                Settings
              </a>
            </div>
          </div>

          {/* Profile/Logout Section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-stone-300 hover:text-emerald-300 hover:bg-emerald-900/20 rounded-lg transition-all duration-300">
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
            <div className="h-8 w-px bg-emerald-800/20"></div>
            <button className="flex items-center space-x-2 text-stone-300 hover:text-emerald-300 transition-colors duration-300">
              <div
                alt="profile"
                className="w-auto h-auto p-2 flex items-center justify-center rounded-full border border-emerald-800/20"
              >
                <h2 className="text-xl">
                  {user
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </h2>
              </div>
              <span className="font-serif">{user}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
