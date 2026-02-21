import React, { useEffect, useState } from "react";
import api from "../services/api";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center p-8">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          HR Onboarding — Passed Candidates
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading candidates...</div>
        ) : candidates.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            🚫 No passed candidates found.
          </div>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, index) => (
                <tr
                  key={c.candidate_id}
                  className="border-b hover:bg-green-50 transition duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{c.name}</td>
                  <td className="py-3 px-4 text-gray-600">{c.email}</td>
                  <td className="py-3 px-4 text-center font-semibold text-green-700">
                    {c.score}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => sendEmail(c)}
                      disabled={sending === c.candidate_id}
                      className={`px-4 py-2 rounded-lg text-white font-medium transition duration-300 shadow-md ${
                        sending === c.candidate_id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {sending === c.candidate_id ? "Sending..." : "Send Email"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p className="text-sm text-center text-gray-500 mt-8">
          © {new Date().getFullYear()} Office Management System — HR Module
        </p>
      </div>
    </div>
  );
};

export default AdminOnboarding;
