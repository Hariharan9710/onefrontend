import React, { useState } from "react";
import api from "../services/api";

interface CandidateForm {
  candidate_name: string;
  candidate_email: string;
  position: string;
  username: string;
  password: string;
}

const AdminAddCandidate: React.FC = () => {
  const [form, setForm] = useState<CandidateForm>({
    candidate_name: "",
    candidate_email: "",
    position: "",
    username: "",
    password: "",  
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await api.post("/admin/add", form);
      setIsSuccess(true);
      setMessage("✅ Candidate added successfully! Email sent to candidate.");
      setForm({
        candidate_name: "",
        candidate_email: "",
        position: "",
        username: "",
        password: "",
      }); 

      // Hide success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setIsSuccess(false);
      setMessage("❌ Error adding candidate! Please try again.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-6 fade-in">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-3xl transition-all hover:shadow-green-200 hover:-translate-y-1 duration-300 border border-green-100">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Admin — Add Candidate
        </h2>

        {/* ✅ Success/Error Message */}
        {message && (
          <div
            className={`mb-6 text-center font-semibold rounded-lg py-2 transition-all ${
              isSuccess
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Name */}
          <div className="relative">
            <input
              id="candidate_name"
              name="candidate_name"
              type="text"
              value={form.candidate_name}
              onChange={handleChange}
              required
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              placeholder=" "
            />
            <label
              htmlFor="candidate_name"
              className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
            >
              Candidate Name
            </label>
          </div>

          {/* Candidate Email */}
          <div className="relative">
            <input
              id="candidate_email"
              name="candidate_email"
              type="email"
              value={form.candidate_email}
              onChange={handleChange}
              required
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              placeholder=" "
            />
            <label
              htmlFor="candidate_email"
              className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
            >
              Candidate Email
            </label>
          </div>

          {/* Position */}
          <div className="relative">
            <input
              id="position"
              name="position"
              type="text"
              value={form.position}
              onChange={handleChange}
              required
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              placeholder=" "
            />
            <label
              htmlFor="position"
              className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
            >
              Position
            </label>
          </div>

          {/* Username */}
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
            >
              Username
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition-all duration-300 shadow-md"
          >
             Add Candidate
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          © 2025 Office Management System
        </p>
      </div>
    </div>
  );
};

export default AdminAddCandidate;
