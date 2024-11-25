import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstancs";
const SignUppage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(email, password, fullname); // Ensure this log is safe
    try {
      const response = await axiosInstance.post("/signup", {
        email,
        password,
        fullname,
      });
      console.log("Signup response:", response); // For debugging only
      if (response.status === 200) {
        navigate("/");
      } else {
        setError("Unexpected response from server");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 flex items-center justify-center p-4">
      <div className="bg-stone-900/80 backdrop-blur-xl p-10 rounded-2xl w-full max-w-md border border-emerald-800/20 shadow-xl shadow-emerald-900/20">
        <h2 className="text-4xl font-serif text-stone-100 text-center mb-8">
          Join Vault<span className="text-emerald-400">.</span>
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-serif text-stone-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="w-full px-6 py-4 bg-stone-800/30 border border-emerald-900/30 rounded-xl text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 hover:bg-stone-800/40"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-serif text-stone-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full px-6 py-4 bg-stone-800/30 border border-emerald-900/30 rounded-xl text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 hover:bg-stone-800/40"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-serif text-stone-300 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              id="name"
              className="w-full px-6 py-4 bg-stone-800/30 border border-emerald-900/30 rounded-xl text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 focus:border-transparent transition-all duration-300 hover:bg-stone-800/40"
              placeholder="John Smith"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            onClick={handleSignUp}
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-800 to-stone-800 rounded-xl text-stone-200 font-serif tracking-wide hover:from-emerald-700 hover:to-stone-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-emerald-900/25 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>
        <p className="text-stone-400 text-center mt-8 font-serif">
          Already have an account?{" "}
          <a
            href="/"
            className="text-emerald-200/70 hover:text-emerald-100 transition-colors duration-300 border-b border-emerald-800/50"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUppage;
