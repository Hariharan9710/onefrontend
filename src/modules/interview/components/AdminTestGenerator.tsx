import React, { useState, useEffect } from "react";
import api from "../services/api";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-2xl">

        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          ⚙️ Admin — Generate Test
        </h2>

        {/* ⭐ TOTAL QUESTIONS FROM JSON */}
        {stats.total > 0 && (
          <div className="mb-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-xl shadow">
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              📦 Question Bank Summary
            </h3>

            <p className="text-gray-700 font-medium text-lg">
              Total Questions in JSON: <b>{stats.total}</b>
            </p>

            <ul className="mt-3 text-gray-700 space-y-1">
              {Object.entries(stats.categoryCounts).map(([cat, count]) => (
                <li key={cat}>
                  <span className="font-semibold capitalize">{cat}:</span>{" "}
                  {count} question{count !== 1 ? "s" : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleGenerate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.keys(counts).map((cat) => (
            <div key={cat} className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">
                {cat.toUpperCase()} Questions
              </label>
              <input
                type="number"
                min="0"
                value={(counts as any)[cat]}
                onChange={(e) =>
                  setCounts({ ...counts, [cat]: Number(e.target.value) })
                }
                className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>
          ))}

          <button
            type="submit"
            className="col-span-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition mt-4 font-semibold"
          >
            🚀 Generate Test
          </button>
        </form>

        <hr className="my-8" />

        {/* GENERATED QUESTIONS PREVIEW */}
        <h3 className="text-2xl font-semibold mb-4 text-purple-700">
          📋 Generated Test ({generated.length} Question
          {generated.length !== 1 ? "s" : ""})
        </h3>

        {/* ⭐ CATEGORY WISE COUNT (Generated Only) */}
        {generated.length > 0 && (
          <div className="mb-6 p-4 bg-purple-50 rounded-xl shadow-sm border border-purple-100">
            <h4 className="text-lg font-semibold text-purple-700 mb-2">
              📌 Generated Category Breakdown
            </h4>
            <ul className="text-gray-700 space-y-1">
              {Object.entries(generatedCategoryCounts).map(([cat, count]) => (
                <li key={cat}>
                  <span className="font-medium capitalize">{cat}:</span>{" "}
                  {count} question{count !== 1 ? "s" : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {generated.length === 0 ? (
          <p className="text-gray-600">No test generated yet.</p>
        ) : (
          <div className="space-y-4">
            {generated.map((q, i) => (
              <div
                key={q.id}
                className="p-4 bg-gray-50 border-l-4 border-purple-400 rounded-md"
              >
                <p className="font-medium">
                  {i + 1}. {q.question}
                </p>
                <p className="text-indigo-600 text-sm">
                  🏷 Category: {q.category} | Type: {q.questionType}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminTestGenerator;
