// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// type TestResult = {
//   test_id: number;
//   name: string;
//   score: number;
//   result: string;
// };

// export default function Results() {
//   const [results, setResults] = useState<TestResult[]>([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/tests/results")
//       .then((res) => res.json())
//       .then(setResults);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
//           👨‍💼 HR Test Results
//         </h2>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 text-left">
//                 <th className="py-3 px-4 border-b">Test ID</th>
//                 <th className="py-3 px-4 border-b">Candidate</th>
//                 <th className="py-3 px-4 border-b">Score</th>
//                 <th className="py-3 px-4 border-b">Status</th>
//                 <th className="py-3 px-4 border-b">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((r) => (
//                 <tr key={r.test_id} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4">{r.test_id}</td>
//                   <td className="py-3 px-4">{r.name}</td>
//                   <td className="py-3 px-4">{r.score}</td>
//                   <td className={`py-3 px-4 font-semibold ${
//                     r.result === "PASSED" ? "text-green-600" : "text-red-500"
//                   }`}>
//                     {r.result}
//                   </td>

//                   {/* VIEW BUTTON */}
//                   <td className="py-3 px-4">
//                     <Link
//                       to={`/admin/test-answers/${r.test_id}`}
//                       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     >
//                       View
//                     </Link>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

type TestResult = {
  test_id: number;
  name: string;
  score: number;
  result: string;
  start_time: string;
};

export default function Results() {
  const [results, setResults] = useState<TestResult[]>([]);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minScore, setMinScore] = useState("");

  useEffect(() => {
    api.get("/tests/results")
      .then((res) => setResults(res.data))
      .catch(console.error);
  }, []);

  // -------------------------------
  // FILTER LOGIC
  // -------------------------------
  const filteredResults = results.filter((r) => {
    const searchLower = search.toLowerCase();

    // Search filter
    const matchesSearch =
      r.name.toLowerCase().includes(searchLower) ||
      String(r.test_id).includes(searchLower) ||
      String(r.score).includes(searchLower) ||
      r.result.toLowerCase().includes(searchLower);

    // Date filter
    const testDate = new Date(r.start_time);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesFromDate = from ? testDate >= from : true;
    const matchesToDate = to ? testDate <= to : true;

    // Score filter
    const matchesScore = minScore ? r.score >= Number(minScore) : true;

    return matchesSearch && matchesFromDate && matchesToDate && matchesScore;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          👨‍💼 HR Test Results
        </h2>

        {/* FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          {/* Search by name/id/score/status */}
          <input
            type="text"
            placeholder="Search Candidate..."
            className="border p-3 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* From Date */}
          <input
            type="date"
            className="border p-3 rounded w-full"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          {/* To Date */}
          <input
            type="date"
            className="border p-3 rounded w-full"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          {/* Minimum Score */}
          <input
            type="number"
            placeholder="Min Score"
            className="border p-3 rounded w-full"
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
          />
        </div>

        {/* RESULTS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="py-3 px-4 border-b">Test ID</th>
                <th className="py-3 px-4 border-b">Candidate</th>
                <th className="py-3 px-4 border-b">Score</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredResults.map((r) => (
                <tr key={r.test_id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{r.test_id}</td>
                  <td className="py-3 px-4">{r.name}</td>
                  <td className="py-3 px-4">{r.score}</td>

                  <td
                    className={`py-3 px-4 font-semibold ${
                      r.result === "PASSED" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {r.result}
                  </td>

                  <td className="py-3 px-4">
                    <Link
                      to={`/interview/admin/test-answers/${r.test_id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
