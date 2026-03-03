import React, { useEffect, useState } from "react";
import api from "../../../interview/services/api";

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
    <div className="min-h-screen bg-transparent py-10 px-6 fade-in">
      <div className="max-w-7xl mx-auto space-y-8 slide-up">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
              Talent Matrix
            </h2>
            <p className="text-slate-400 mt-2 text-lg">Comprehensive dashboard for tracked candidate progression</p>
          </div>
          
          <div className="glass-card flex items-center bg-white/5 px-6 py-4 rounded-2xl border border-white/10 shadow-emerald-500/5">
            <div className="flex flex-col mr-8 pr-8 border-r border-white/10">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Total Tracked</span>
              <span className="text-emerald-400 text-3xl font-mono font-black">{candidates.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Filters Active</span>
              <span className="text-slate-200 text-3xl font-mono font-black">{filteredCandidates.length}</span>
            </div>
          </div>
        </div>

        {/* 🔍 SEARCH & FILTER MODULE */}
        <div className="glass-card rounded-3xl p-6 border border-white/5 slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl font-bold"></span>
              <input
                type="text"
                placeholder="Query name, credentials, skills or role..."
                className="glass-input w-full rounded-2xl pl-12 pr-4 py-4 text-slate-200 placeholder-slate-600 font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Creation Start</span>
              <input
                type="date"
                className="glass-input rounded-2xl px-4 py-3 text-slate-400 lowercase border-indigo-500/20"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Creation End</span>
              <input
                type="date"
                className="glass-input rounded-2xl px-4 py-3 text-slate-400 lowercase border-indigo-500/20"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* DATAGRID MODULE */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/5 slide-up" style={{ animationDelay: '0.2s' }}>
          {filteredCandidates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6 opacity-30">
               <div className="text-7xl">🔍</div>
               <p className="text-2xl font-black text-slate-400 uppercase tracking-widest">Zero Matches Found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 border-b border-white/5">
                  <tr className="text-slate-500 uppercase text-[10px] font-black tracking-widest">
                    <th className="px-6 py-5">Index</th>
                    <th className="px-6 py-5">Identities</th>
                    <th className="px-6 py-5">Role / Position</th>
                    <th className="px-6 py-5">Metrics & Skills</th>
                    <th className="px-6 py-5">Progression Status</th>
                    <th className="px-6 py-5 text-center">Documentation</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.03]">
                  {filteredCandidates.map((c, index) => (
                    <tr key={c.id} className="group hover:bg-emerald-500/[0.02] transition-colors">
                      <td className="px-6 py-5 text-slate-600 font-mono text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-slate-200 font-bold text-lg group-hover:text-emerald-400 transition-colors">
                            {c.full_name || c.candidate_name}
                          </span>
                          <span className="text-slate-500 text-xs font-mono lowercase">{c.candidate_email}</span>
                          <span className="text-slate-600 text-xs mt-1 italic">{c.phone || "No contact info"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 rounded-md">
                          {c.position}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {c.skills ? (
                          <div className="flex flex-wrap gap-2">
                             {c.skills.split(',').slice(0, 3).map((s, i) => (
                               <span key={i} className="px-2 py-0.5 bg-white/5 text-slate-400 text-[10px] rounded-md border border-white/10 uppercase font-bold">
                                 {s.trim()}
                               </span>
                             ))}
                             {c.skills.split(',').length > 3 && <span className="text-slate-600 text-[10px] font-bold">+{c.skills.split(',').length - 3}</span>}
                          </div>
                        ) : (
                          <span className="text-slate-700 italic text-sm">Incomplete matrix</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col space-y-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            c.status === "REGISTER_COMPLETED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                               c.status === "REGISTER_COMPLETED" ? 'bg-emerald-400' : 'bg-amber-500'
                            } animate-pulse`}></span>
                            {c.status.replace(/_/g, ' ')}
                          </span>
                          <span className="text-slate-600 text-[9px] font-bold pl-1 uppercase tracking-tighter">Registered: {new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {c.resume_link ? (
                          <a
                            href={c.resume_link}
                            target="_blank"
                            className="inline-flex items-center px-4 py-2 bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-105"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            Explore
                          </a>
                        ) : (
                          <span className="text-slate-700 text-xs italic tracking-widest uppercase font-black opacity-20">No File</span>
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
    </div>
  );
};

export default AdminViewCandidates;
