import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [username, setUsername] = useState([]);
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();

  function timeAgo(isoTime) {
    const now = new Date();
    const targetTime = new Date(isoTime);

    // Get the difference in milliseconds
    const differenceInMs = now - targetTime;

    if (differenceInMs < 0) {
      return "In the future";
    }

    // Convert the difference to seconds, minutes, hours, and days
    const seconds = Math.floor(differenceInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? "sec" : "secs"} ago`;
    }
  }

  const getAdminData = async () => {
    const response = await axiosInstance.get("/admin_dashboard");
    setUsers(response.data.users);
    setFiles(response.data.files);
    setUsername(response.data.userDetails);
    setUpdates(response.data.updates);

    console.log("username", response.data.userDetails);
  };

  const deleteUser = async (user_id) => {
    try {
      const response = await axiosInstance.delete("/delete_user", {
        data: { user_id }, // Send data in request body for DELETE
      });
      if (response.status === 200) {
        // Refresh data after successful deletion
        getAdminData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    getAdminData();
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-serif text-stone-100">Admin Portal</h1>
          <button
            onClick={() => {
              navigate("/admin-login");
            }}
            className="px-6 py-3 bg-stone-100 text-stone-900 rounded-lg hover:bg-white transition-all duration-200 font-medium"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Statistics Cards */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-serif text-stone-100 mb-4">
              Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-stone-400 text-sm">Total Users</p>
                <p className="text-4xl font-serif text-stone-100">
                  {users.length || 0}
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-stone-400 text-sm">Total Files</p>
                <p className="text-4xl font-serif text-stone-100">
                  {files.length || 0}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-serif text-stone-100 mb-4">Files</h3>
              <div className="max-h-60 overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.file_id}
                    className="bg-white/5 p-4 rounded-xl mb-3"
                  >
                    <p className="text-stone-100">{file.file_name}</p>
                    <div className="flex justify-between text-stone-400 text-sm mt-2">
                      <span>{file.file_type}</span>
                      <span>
                        {new Date(file.uploaded_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-serif text-stone-100 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {updates.map((item) => (
                <div
                  key={item}
                  className="bg-white/5 p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="text-stone-100">
                      User {item.username} uploaded
                    </p>
                    <p className="text-stone-400 text-sm">
                      {timeAgo(item.uploaded_at)}
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 md:col-span-2">
            <h2 className="text-2xl font-serif text-stone-100 mb-6">
              User Management
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-stone-400 border-b border-stone-700">
                    <th className="pb-4">User</th>
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-stone-100">
                  {username.map((users, index) => (
                    <tr key={users.id} className="border-b border-stone-700/50">
                      <td className="py-4">{users.fullname}</td>

                      <td className="py-4">{users.email}</td>
                      <td className="py-4">
                        <span className="cursor-pointer px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                          Active
                        </span>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => deleteUser(users.id)}
                          className="cursor-pointer px-3 py-1 text-sm text-red-300 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
