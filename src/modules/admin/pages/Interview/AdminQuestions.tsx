import React, { useEffect, useState } from "react";
import api from "../../../interview/services/api";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  category: string;
  questionType: string;
  code?: string;
}

const AdminQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    code: "",
    options: ["", "", "", ""],
    correct: "",
    category: "java",
    questionType: "theory",
  });

  // Load All Questions
  const fetchQuestions = async () => {
    const res = await api.get("/questions/view");
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Add Question Handler
  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newQuestion.question.trim()) {
      alert("Enter Question");
      return;
    }

    if (newQuestion.questionType === "program" && !newQuestion.code.trim()) {
      alert("Paste code for program question");
      return;
    }

    if (newQuestion.options.some((o) => !o.trim())) {
      alert("Please fill all 4 options");
      return;
    }

    if (!newQuestion.correct.trim()) {
      alert("Please select correct option");
      return;
    }

    await api.post("/questions/add", newQuestion);

    alert("✅ Question Added");

    setNewQuestion({
      question: "",
      code: "",
      options: ["", "", "", ""],
      correct: "",
      category: "java",
      questionType: "theory",
    });

    fetchQuestions();
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this question?")) return;

    await api.delete(`/questions/delete/${id}`);
    fetchQuestions();
  };

  return (
    <div className="min-h-screen bg-transparent p-10 fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center slide-up">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
            Question Lab
          </h2>
          <p className="text-slate-400 mt-4 text-xl">Curate and manage your technical assessment catalog</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ADD QUESTION FORM */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-8 sticky top-10 slide-up">
              <h3 className="text-2xl font-bold text-slate-200 mb-6 flex items-center">
                <span className="mr-3 text-emerald-400">➕</span> New Challenge
              </h3>
              
              <form onSubmit={handleAddQuestion} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Category</label>
                    <select
                      value={newQuestion.category}
                      onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                      className="glass-input rounded-xl p-3 text-slate-200"
                    >
                      <option value="java">Java</option>
                      <option value="sql">SQL</option>
                      <option value="react">React</option>
                      <option value="spring">Spring Boot</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Type</label>
                    <select
                      value={newQuestion.questionType}
                      onChange={(e) => setNewQuestion({ ...newQuestion, questionType: e.target.value })}
                      className="glass-input rounded-xl p-3 text-slate-200"
                    >
                      <option value="theory">Theory</option>
                      <option value="program">Program</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Question Prompt</label>
                  <input
                    type="text"
                    placeholder="e.g. What is a Hook in React?"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="glass-input rounded-xl p-3 text-slate-200"
                  />
                </div>

                {newQuestion.questionType === "program" && (
                  <div className="flex flex-col space-y-2">
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Code Snippet</label>
                    <textarea
                      placeholder="Paste your code here..."
                      value={newQuestion.code}
                      onChange={(e) => setNewQuestion({ ...newQuestion, code: e.target.value })}
                      rows={6}
                      className="glass-input rounded-xl p-3 text-slate-200 font-mono text-sm"
                    ></textarea>
                  </div>
                )}

                <div className="space-y-4">
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Options</label>
                  {newQuestion.options.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const temp = [...newQuestion.options];
                        temp[i] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: temp });
                      }}
                      className="glass-input rounded-xl p-3 text-slate-200 w-full"
                    />
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Validation</label>
                  <select
                    value={newQuestion.correct}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correct: e.target.value })}
                    className="glass-input rounded-xl p-3 text-slate-200 border-emerald-500/30"
                  >
                    <option value="">Select Correct Answer</option>
                    {newQuestion.options.map((o, i) => (
                      <option key={i} value={o}>
                        Option {i + 1} {o ? `(${o.slice(0, 20)}...)` : "(Empty)"}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full premium-btn-primary py-4 text-lg"
                >
                  Publish Challenge
                </button>
              </form>
            </div>
          </div>

          {/* EXISTING QUESTIONS LIST */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-bold text-slate-200">Catalog</h3>
                <div className="flex items-center space-x-2 bg-white/5 py-1 px-3 rounded-full border border-white/10">
                  <span className="text-emerald-400 font-mono text-xl">{questions.length}</span>
                  <span className="text-slate-500 text-sm uppercase font-bold tracking-widest">Questions</span>
                </div>
              </div>

              {questions.length === 0 ? (
                <div className="py-20 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                  <p className="text-slate-500 italic text-lg">No challenges available in the catalog.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {questions.map((q, i) => (
                    <div key={q.id} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="text-slate-600 font-mono text-xl">#{String(i + 1).padStart(2, '0')}</span>
                          <div className="flex space-x-2">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              q.category === 'java' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' :
                              q.category === 'react' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' :
                              'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20'
                            }`}>
                              {q.category}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20 text-[10px] font-bold uppercase tracking-wider">
                              {q.questionType}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="p-2 text-slate-600 hover:text-rose-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-slate-200 mb-6 group-hover:text-emerald-400 transition-colors">
                        {q.question}
                      </h4>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {q.options.map((opt, idx) => (
                          <div 
                            key={idx} 
                            className={`p-3 rounded-xl border text-sm transition-all ${
                              opt === q.correct 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold' 
                              : 'bg-white/5 border-white/10 text-slate-400'
                            }`}
                          >
                            <span className="opacity-50 mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                          </div>
                        ))}
                      </div>

                      {q.code && (
                        <div className="mb-4">
                          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-indigo-300 overflow-x-auto font-mono">
                            {q.code}
                          </pre>
                        </div>
                      )}
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

export default AdminQuestions;
