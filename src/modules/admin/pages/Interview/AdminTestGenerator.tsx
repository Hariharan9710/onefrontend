import React, { useState, useEffect } from "react";
import api from "../../../interview/services/api";

// ⭐ Type for category counts
interface CategoryCount {
  [key: string]: number;
}

// ⭐ Type for stats returned from backend
interface StatsResponse {
  total: number;
  categoryCounts: CategoryCount;  
}

const AdminTestGenerator: React.FC = () => {
  const [counts, setCounts] = useState({
    java: 0,
    sql: 0,
    react: 0,
    spring: 0,
  });

  const [generated, setGenerated] = useState<any[]>([]);
  const [stats, setStats] = useState<StatsResponse>({
    total: 0,
    categoryCounts: {},
  });

  // ⭐ Load total questions + category count safely
  useEffect(() => {
    api
      .get("/questions/count")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      java: Number(counts.java),
      sql: Number(counts.sql),
      react: Number(counts.react),
      spring: Number(counts.spring),
    };

    const res = await api.post(
      "/questions/generate-test",
      body
    );

    alert("✅ Test Generated Successfully!");
    setGenerated(res.data.questions);
  };

  // ⭐ Count generated test category-wise with proper typing
  const generatedCategoryCounts: CategoryCount = {};
  generated.forEach((q) => {
    if (!generatedCategoryCounts[q.category]) {
      generatedCategoryCounts[q.category] = 0;
    }
    generatedCategoryCounts[q.category]++;
  });

  return (
    <div className="min-h-screen bg-transparent p-10 fade-in">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center slide-up">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
            Assessment Architect
          </h2>
          <p className="text-slate-400 mt-4 text-xl">Configure and deploy custom technical assessments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            {/* ⭐ TOTAL QUESTIONS FROM JSON */}
            {stats.total > 0 && (
              <div className="glass-card rounded-3xl p-8 slide-up">
                <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center">
                  <span className="mr-3 text-indigo-400">📊</span> Catalog Insights
                </h3>

                <div className="bg-indigo-500/5 rounded-2xl p-4 border border-indigo-500/10 mb-6">
                  <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Total Pool</p>
                  <p className="text-indigo-400 text-4xl font-mono font-bold mt-1">{stats.total}</p>
                </div>

                <div className="space-y-4">
                  {Object.entries(stats.categoryCounts).map(([cat, count]) => (
                    <div key={cat} className="flex justify-between items-center group">
                      <span className="text-slate-400 capitalize font-medium group-hover:text-slate-200 transition-colors">{cat}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500/50" 
                            style={{ width: `${(count / stats.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-slate-200 font-mono text-sm w-8 text-right font-bold">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FORM */}
            <div className="glass-card rounded-3xl p-8 slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-slate-200 mb-8 flex items-center">
                <span className="mr-3 text-blue-400">⚙️</span> Configuration
              </h3>
              
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="grid grid-cols-1 gap-5">
                  {Object.keys(counts).map((cat) => (
                    <div key={cat} className="flex flex-col space-y-2 group">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">{cat}</label>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Max: {stats.categoryCounts[cat] || 0}</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        max={stats.categoryCounts[cat] || undefined}
                        value={(counts as any)[cat]}
                        onChange={(e) =>
                          setCounts({ ...counts, [cat]: Number(e.target.value) })
                        }
                        className="glass-input rounded-xl p-4 text-slate-200 placeholder-slate-700"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full premium-btn-secondary py-4 text-lg mt-4"
                >
                  Architect Test
                </button>
              </form>
            </div>
          </div>

          {/* GENERATED QUESTIONS PREVIEW */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 slide-up min-h-[600px]" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-bold text-slate-200">Current Blueprint</h3>
                <div className="flex items-center space-x-4">
                  {generated.length > 0 && (
                    <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20 text-sm font-bold animate-pulse">
                      DEPLOY READY
                    </div>
                  )}
                  <div className="bg-white/5 py-1 px-3 rounded-full border border-white/10 flex items-center space-x-2">
                    <span className="text-blue-400 font-mono text-xl">{generated.length}</span>
                    <span className="text-slate-500 text-xs uppercase font-black">Tasks</span>
                  </div>
                </div>
              </div>

              {generated.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-white/5 rounded-3xl opacity-40">
                  <div className="text-6xl mb-6">📝</div>
                  <p className="text-slate-400 text-xl font-medium">Configure and click 'Architect Test' to preview</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {generated.map((q, i) => (
                    <div 
                      key={q.id} 
                      className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-slate-600 font-mono text-sm font-bold">TASK {String(i + 1).padStart(2, '0')}</span>
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                           q.category === 'java' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                           q.category === 'react' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                           'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {q.category}
                        </span>
                      </div>
                      <p className="text-slate-200 text-lg font-semibold group-hover:text-blue-400 transition-colors">
                        {q.question}
                      </p>
                      <div className="mt-4 flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                         <span className="mr-2">Complexity:</span>
                         <span className="text-slate-400">{q.questionType} Entry</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTestGenerator;
