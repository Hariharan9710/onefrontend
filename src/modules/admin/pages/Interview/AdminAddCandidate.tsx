import React, { useState } from "react";
import api from "../../../interview/services/api";

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
    <div className="min-h-screen flex items-center justify-center bg-transparent p-6 fade-in">
      <div className="glass-card rounded-3xl p-10 w-full max-w-2xl slide-up">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
            Registration
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Create a new candidate profile and send credentials</p>
        </div>

        {/* ✅ Success/Error Message */}
        {message && (
          <div
            className={`mb-8 text-center font-semibold rounded-2xl py-4 px-6 transition-all slide-up ${
              isSuccess
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Candidate Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="candidate_name" className="text-slate-400 text-sm font-medium ml-1">Candidate Name</label>
              <input
                id="candidate_name"
                name="candidate_name"
                type="text"
                value={form.candidate_name}
                onChange={handleChange}
                required
                className="glass-input rounded-xl px-5 py-3 text-slate-200"
                placeholder="John Doe"
              />
            </div>

            {/* Candidate Email */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="candidate_email" className="text-slate-400 text-sm font-medium ml-1">Email Address</label>
              <input
                id="candidate_email"
                name="candidate_email"
                type="email"
                value={form.candidate_email}
                onChange={handleChange}
                required
                className="glass-input rounded-xl px-5 py-3 text-slate-200"
                placeholder="john@example.com"
              />
            </div>

            {/* Position */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="position" className="text-slate-400 text-sm font-medium ml-1">Target Position</label>
              <input
                id="position"
                name="position"
                type="text"
                value={form.position}
                onChange={handleChange}
                required
                className="glass-input rounded-xl px-5 py-3 text-slate-200"
                placeholder="Software Engineer"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="username" className="text-slate-400 text-sm font-medium ml-1">System Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                required
                className="glass-input rounded-xl px-5 py-3 text-slate-200"
                placeholder="johndoe_dev"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label htmlFor="password" className="text-slate-400 text-sm font-medium ml-1">Access Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="glass-input rounded-xl px-5 py-3 text-slate-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full premium-btn-primary py-4 text-xl mt-4"
          >
             Register Candidate
          </button>
        </form>

        <footer className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-slate-500 text-xs italic">Credentials will be sent immediately upon registration.</p>
          <p className="text-slate-500 text-xs mt-2 italic">© {new Date().getFullYear()} Office Management System</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminAddCandidate;
