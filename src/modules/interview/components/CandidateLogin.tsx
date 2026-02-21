import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface CandidateData {
  id: number;
  username: string;
  candidate_email: string;
}

interface CandidateLoginProps {
  onLoginSuccess: (candidate: CandidateData) => void;
}

const CandidateLogin: React.FC<CandidateLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/candidate/login", { email, password });
      alert("✅ Login Successful!");
      onLoginSuccess(res.data.candidate);
      navigate("/interview/candidate/register");
    } catch {
      alert("❌ Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md h-[70vh] flex flex-col justify-center items-center border border-gray-100 transition-all hover:shadow-green-200 hover:-translate-y-1 duration-300">
        <h3 className="text-3xl font-bold text-center text-green-600 mb-8">
          Candidate Login
        </h3>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Email Field */}
          <input
            type="email"
            className="w-full px-4 py-3 bg-green-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <input
            type="password"
            className="w-full px-4 py-3 bg-green-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition duration-300 shadow-md"
          >
            🔑 Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-8">
          © 2025 Office Management System
        </p>
      </div>
    </div>
  );
};

export default CandidateLogin;
