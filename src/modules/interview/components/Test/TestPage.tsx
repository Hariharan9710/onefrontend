// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function TestPage() {
//   const navigate = useNavigate();
//   const { testId } = useParams();

//   const [questions, setQuestions] = useState<any[]>([]);
//   const [answers, setAnswers] = useState<{ [key: number]: string }>({});
//   const [timeLeft, setTimeLeft] = useState(1200);

//   // ✅ Load test from storage or start new
//   useEffect(() => {
//     const storedTest = JSON.parse(localStorage.getItem("activeTest") || "null");

//     if (storedTest && storedTest.test_id === Number(testId)) {
//       // Continue old test
//       setQuestions(storedTest.questions);
//       setAnswers(storedTest.answers || {});

//       const elapsed = Math.floor((Date.now() - storedTest.startTime) / 1000);
//       const remaining = storedTest.duration - elapsed;
//       setTimeLeft(remaining > 0 ? remaining : 0);
//     } else {
//       // Fresh test (from sessionStorage)
//       const q = JSON.parse(sessionStorage.getItem("testQuestions") || "[]");
//       if (!q.length) {
//         alert("⚠️ No test found. Please start again.");
//         navigate("/start");
//         return;
//       }

//       const newTest = {
//         test_id: Number(testId),
//         questions: q,
//         startTime: Date.now(),
//         duration: 1200, // 20 mins
//         answers: {},
//       };

//       localStorage.setItem("activeTest", JSON.stringify(newTest));
//       setQuestions(q);
//     }
//   }, []);

//   // ✅ Save answers persistently
//   const handleAnswer = (qid: number, opt: string) => {
//     const updated = { ...answers, [qid]: opt };
//     setAnswers(updated);

//     const activeTest = JSON.parse(localStorage.getItem("activeTest") || "{}");
//     activeTest.answers = updated;
//     localStorage.setItem("activeTest", JSON.stringify(activeTest));
//   };

//   // ✅ Countdown timer
//   useEffect(() => {
//     if (timeLeft <= 0) {
//       submit(true);
//       return;
//     }

//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // ✅ Format time
//   const formatTime = (s: number) => {
//     const m = String(Math.floor(s / 60)).padStart(2, "0");
//     const sec = String(s % 60).padStart(2, "0");
//     return `${m}:${sec}`;
//   };

//   // ✅ Submit function
//   const submit = async (auto = false) => {
//     const activeTest = JSON.parse(localStorage.getItem("activeTest") || "null");
//     if (!activeTest) return;

//     await fetch("http://localhost:5000/api/tests/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ test_id: activeTest.test_id, answers }),
//     });

//     localStorage.removeItem("activeTest");
//     sessionStorage.removeItem("testQuestions");

//     if (auto) alert("⏰ Time is up! Your test was auto-submitted.");

//     navigate("/test-submitted");
//   };

//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
//         <h2 className="text-2xl font-bold text-red-500">⚠️ No Test Found</h2>
//         <p className="text-gray-600 mt-2">
//           Your session expired. Please restart your test.
//         </p>
//         <button
//           onClick={() => navigate("/start")}
//           className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//         >
//           🔙 Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-indigo-600">📝 Test In Progress</h2>
//           <p
//             className={`text-xl font-semibold ${
//               timeLeft < 60 ? "text-red-500" : "text-gray-700"
//             }`}
//           >
//             ⏳ {formatTime(timeLeft)}
//           </p>
//         </div>

//         {questions.map((q: any, i: number) => (
//           <div
//             key={q.id}
//             className="bg-gray-50 p-5 mb-5 rounded-xl border-l-4 border-indigo-400"
//           >
//             <p className="font-medium mb-3">
//               {i + 1}. {q.question}
//             </p>
//             {q.options.map((opt: string, idx: number) => (
//               <label
//                 key={idx}
//                 className="block border rounded-md px-3 py-2 mb-2 cursor-pointer hover:bg-indigo-50"
//               >
//                 <input
//                   type="radio"
//                   name={String(q.id)}
//                   value={opt}
//                   checked={answers[q.id] === opt}
//                   className="mr-3"
//                   onChange={() => handleAnswer(q.id, opt)}
//                 />
//                 {opt}
//               </label>
//             ))}
//           </div>
//         ))}

//         <button
//           onClick={() => submit(false)}
//           className="w-full mt-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md"
//         >
//           ✅ Submit Test
//         </button>
//       </div>
//     </div>
//   );
// }

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TestPage() {
  const navigate = useNavigate();
  const { testId } = useParams();

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(1200);

  useEffect(() => {
    const storedTest = JSON.parse(localStorage.getItem("activeTest") || "null");

    if (storedTest && storedTest.test_id === Number(testId)) {
      setQuestions(storedTest.questions);
      setAnswers(storedTest.answers || {});

      const elapsed = Math.floor((Date.now() - storedTest.startTime) / 1000);
      const remaining = storedTest.duration - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    } else {
      const q = JSON.parse(sessionStorage.getItem("testQuestions") || "[]");
      if (!q.length) {
        alert("⚠️ No test found. Please start again.");
        navigate("/interview/candidate/start-test");
        return;
      }

      const newTest = {
        test_id: Number(testId),
        questions: q,
        startTime: Date.now(),
        duration: 1200,
        answers: {},
      };

      localStorage.setItem("activeTest", JSON.stringify(newTest));
      setQuestions(q);
    }
  }, []);

  const handleAnswer = (qid: number, opt: string) => {
    const updated = { ...answers, [qid]: opt };
    setAnswers(updated);

    const activeTest = JSON.parse(localStorage.getItem("activeTest") || "{}");
    activeTest.answers = updated;
    localStorage.setItem("activeTest", JSON.stringify(activeTest));
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      submit(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  const submit = async (auto = false) => {
    const activeTest = JSON.parse(localStorage.getItem("activeTest") || "null");
    if (!activeTest) return;

    await api.post("/tests/submit", { test_id: activeTest.test_id, answers });

    localStorage.removeItem("activeTest");
    sessionStorage.removeItem("testQuestions");

    if (auto) alert("⏰ Time is up! Test auto-submitted.");

    navigate("/interview/test-submitted");
  };

  if (questions.length === 0)
    return <h1 className="text-center mt-10">Loading test...</h1>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">
        Test In Progress — Time Left: {formatTime(timeLeft)}
      </h2>

      {questions.map((q: any, i: number) => (
        <div key={q.id} className="p-4 bg-gray-50 my-4 rounded-xl border">
          <p className="font-medium">
            {i + 1}. {q.question}
          </p>

          {q.options.map((opt: string, idx: number) => (
            <label
              key={idx}
              className="block border p-2 rounded cursor-pointer"
            >
              <input
                type="radio"
                name={String(q.id)}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleAnswer(q.id, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={() => submit(false)}
        className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg"
      >
        Submit Test
      </button>
    </div>
  );
}
