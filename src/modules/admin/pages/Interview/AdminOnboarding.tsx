import React, { useEffect, useState } from "react";
import api from "../../../interview/services/api";

interface Candidate {
  test_id: number;
  candidate_id: number;
  name: string;
  email: string;
  score: number;
  result: string;
}

const AdminOnboarding: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState<number | null>(null);

  // ✅ Fetch passed candidates
  useEffect(() => {
    const fetchPassedCandidates = async () => {
      try {
        setLoading(true);
        const res = await api.get("/onboarding/selected");
        setCandidates(res.data);
      } catch (err) {
        console.error("❌ Error fetching passed candidates:", err);
        alert("Failed to fetch passed candidates.");
      } finally {
        setLoading(false);
      }
    };
    fetchPassedCandidates();
  }, []);

  // ✅ Send onboarding email
  const sendEmail = async (candidate: Candidate) => {
    if (!window.confirm(`Send onboarding email to ${candidate.name}?`)) return;

    try {
      setSending(candidate.candidate_id);
      const res = await api.post("/onboarding/send-email", {
        email: candidate.email,
        username: candidate.name,
      });
      alert(res.data.message || "✅ Email sent successfully!");
    } catch (err) {
      console.error("❌ Error sending email:", err);
      alert("Failed to send onboarding email.");
    } finally {
      setSending(null);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center p-8 fade-in">
      <div className="glass-card rounded-3xl p-8 w-full max-w-6xl slide-up">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              Onboarding Portal
            </h2>
            <p className="text-slate-400 mt-2">Manage and initiate onboarding for successful candidates</p>
          </div>
          <div className="bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            <span className="text-emerald-400 font-semibold">{candidates.length} Passed Candidates</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            <p className="text-slate-400 animate-pulse">Fetching candidate data...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <div className="text-6xl mb-4">🧊</div>
            <h3 className="text-xl font-semibold text-slate-300">No candidates found</h3>
            <p className="text-slate-500 mt-2">Candidates who pass the exam with 20+ score will appear here.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-slate-300 uppercase text-xs tracking-wider">
                  <th className="py-4 px-6 font-bold">#</th>
                  <th className="py-4 px-6 font-bold">Candidate Info</th>
                  <th className="py-4 px-6 font-bold text-center">Test Score</th>
                  <th className="py-4 px-6 font-bold text-center">Onboarding Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {candidates.map((c, index) => (
                  <tr
                    key={c.candidate_id}
                    className="group hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-slate-500 font-mono">{String(index + 1).padStart(2, '0')}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-slate-200 font-semibold text-lg group-hover:text-emerald-400 transition-colors">
                          {c.name}
                        </span>
                        <span className="text-slate-400 text-sm">{c.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg font-bold border border-emerald-500/20">
                        {c.score} / 40
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => sendEmail(c)}
                        disabled={sending === c.candidate_id}
                        className={`premium-btn-primary py-2 px-8 text-sm ${
                          sending === c.candidate_id ? "opacity-50 cursor-not-allowed scale-95" : ""
                        }`}
                      >
                        {sending === c.candidate_id ? (
                          <span className="flex items-center space-x-2">
                             <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                             <span>Processing...</span>
                          </span>
                        ) : "Initiate Onboarding"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-slate-500 text-xs">
           <p>© {new Date().getFullYear()} Office Management System — HR Module</p>
           <p className="flex items-center space-x-1">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
             <span>System Active</span>
           </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminOnboarding;
