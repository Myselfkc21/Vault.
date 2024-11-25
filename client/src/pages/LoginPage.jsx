import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstancs";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    console.log(email, password);
    const response = await axiosInstance.post("/login", { email, password });
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl animate-pulse -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-stone-800/10 rounded-full blur-3xl animate-pulse -bottom-20 -right-20"></div>

      <div className="max-w-md w-full p-10 bg-stone-900/40 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-emerald-900/30 relative group hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-500">
        <div className="text-center mb-12 relative">
          <h2 className="text-5xl font-serif tracking-tight text-stone-200">
            Welcome Back
          </h2>
          <p className="text-emerald-100/70 mt-3 font-light tracking-widest uppercase text-sm">
            Please sign in to continue
          </p>
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-emerald-700 to-stone-700 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin"></div>
        </div>

        <form className="space-y-8">
          <div className="group/input">
            <label
              htmlFor="email"
              className="block text-sm font-serif text-stone-300 mb-2 tracking-wide"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="block w-full px-6 py-4 bg-stone-800/30 border border-emerald-900/30 rounded-xl text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 hover:bg-stone-800/40"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="group/input">
            <label
              htmlFor="password"
              className="block text-sm font-serif text-stone-300 mb-2 tracking-wide"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-6 py-4 bg-stone-800/30 border border-emerald-900/30 rounded-xl text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 hover:bg-stone-800/40"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <a
              href="#"
              className="text-emerald-200/70 hover:text-emerald-100 transition-colors duration-300 font-serif"
            >
              Forgot password?
            </a>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-800 to-stone-800 rounded-xl text-stone-200 font-serif tracking-wide hover:from-emerald-700 hover:to-stone-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-emerald-900/25 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p
            className="text-stone-400 font-serif"
            onClick={() => navigate("/signup")}
          >
            Don't have an account?{" "}
            <a
              href="#"
              className="text-emerald-200/70 hover:text-emerald-100 transition-colors duration-300 border-b border-emerald-800/50"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
