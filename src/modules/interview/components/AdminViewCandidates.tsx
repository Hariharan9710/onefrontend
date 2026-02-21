import React, { useEffect, useState } from "react";
import api from "../services/api";

interface CandidateDetails {
  id: number;
  candidate_name: string;
  candidate_email: string;
  position: string;
  username: string;
  status: string;
  full_name?: string;
  phone?: string;
  gender?: string;
  education?: string;
  experience?: string;
  skills?: string;
  resume_link?: string;
  created_at: string;
}

const AdminViewCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await api.get("/admin/registered");
        setCandidates(res.data);
      } catch (err) {
        console.error("❌ Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // -------------------------------------
  // FILTER LOGIC
  // -------------------------------------
  const filteredCandidates = candidates.filter((c) => {
    const searchLower = search.toLowerCase();

    // Search across all fields
    const matchesSearch =
      c.candidate_name.toLowerCase().includes(searchLower) ||
      (c.full_name || "").toLowerCase().includes(searchLower) ||
      c.candidate_email.toLowerCase().includes(searchLower) ||
      c.position.toLowerCase().includes(searchLower) ||
      (c.phone || "").toLowerCase().includes(searchLower) ||
      (c.education || "").toLowerCase().includes(searchLower) ||
      (c.skills || "").toLowerCase().includes(searchLower) ||
      c.status.toLowerCase().includes(searchLower);

    // Date filter
    const createdDate = new Date(c.created_at);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesFrom = from ? createdDate >= from : true;
    const matchesTo = to ? createdDate <= to : true;

    return matchesSearch && matchesFrom && matchesTo;
  });

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        ⏳ Loading Registered Candidates...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-10 px-6 fade-in">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
          👩‍💼 Registered Candidates
        </h2>

        {/* 🔍 FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search name, email, phone, skills..."
            className="border p-3 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="date"
            className="border p-3 rounded-md"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            className="border p-3 rounded-md"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {filteredCandidates.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No candidates found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Education</th>
                  <th className="px-4 py-3">Skills</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Resume</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredCandidates.map((c, index) => (
                  <tr key={c.id} className="hover:bg-green-50 transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">
                      {c.full_name || c.candidate_name}
                    </td>
                    <td className="px-4 py-3">{c.candidate_email}</td>
                    <td className="px-4 py-3">{c.position}</td>
                    <td className="px-4 py-3">{c.phone || "—"}</td>
                    <td className="px-4 py-3">{c.education || "—"}</td>
                    <td className="px-4 py-3 truncate max-w-xs">{c.skills || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.status === "REGISTER_COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {c.resume_link ? (
                        <a
                          href={c.resume_link}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViewCandidates;
