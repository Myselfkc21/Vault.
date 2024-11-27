import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [codeConfirm, setCodeConfirm] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (codeConfirm != code) {
      setError("Codes do not match");
    } else {
      setError("");
    }
  }, [codeConfirm, code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, code);
    try {
      const response = await axiosInstance.post("/admin_login", {
        email,
        code,
      });
      if (response.status === 200) {
        navigate("/adminDashboard");
      }
    } catch (error) {
      setError("Invalid email or code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700">
      <div className="max-w-md w-full p-12 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center">
          <h2 className="mt-2 text-5xl font-bold text-white font-sans tracking-tight">
            Admin Portal
          </h2>
          <p className="mt-3 text-stone-300 text-sm">
            Enter your credentials to access the dashboard
          </p>
        </div>
        <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full px-4 py-4 bg-white/5 border border-stone-600 rounded-xl placeholder-stone-400 text-white focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all duration-200"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="code"
                name="code"
                type="password"
                required
                className="block w-full px-4 py-4 bg-white/5 border border-stone-600 rounded-xl placeholder-stone-400 text-white focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all duration-200"
                placeholder="Set a code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="code" className="sr-only">
                Code
              </label>
              <input
                id="codeConfirm"
                name="codeConfirm"
                type="password"
                required
                className="block w-full px-4 py-4 bg-white/5 border border-stone-600 rounded-xl placeholder-stone-400 text-white focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all duration-200"
                placeholder="confirm the code"
                value={codeConfirm}
                onChange={(e) => setCodeConfirm(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-4 px-6 text-sm font-medium rounded-xl text-stone-900 bg-stone-100 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400 transition-all duration-200 shadow-lg shadow-stone-900/20"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
