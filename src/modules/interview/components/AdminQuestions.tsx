import React, { useEffect, useState } from "react";
import api from "../services/api";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          🧠 Admin — Manage Questions
        </h2>

        {/* ADD QUESTION FORM */}
        <form
          onSubmit={handleAddQuestion}
          className="grid grid-cols-1 gap-5 mb-10"
        >
          {/* CATEGORY */}
          <select
            value={newQuestion.category}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, category: e.target.value })
            }
            className="p-3 rounded-lg border border-green-400 focus:ring-2 focus:ring-green-300 text-lg"
          >
            <option value="java">Java</option>
            <option value="sql">SQL</option>
            <option value="react">React</option>
            <option value="spring">Spring Boot</option>
          </select>

          {/* QUESTION TYPE */}
          <select
            value={newQuestion.questionType}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, questionType: e.target.value })
            }
            className="p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-300 text-lg"
          >
            <option value="theory">Theory</option>
            <option value="program">Program</option>
          </select>

          {/* QUESTION */}
          <input
            type="text"
            placeholder="Enter Question"
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
            className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-300"
          />

          {/* PROGRAM CODE TEXTAREA */}
          {newQuestion.questionType === "program" && (
            <textarea
              placeholder="Paste Code Here..."
              value={newQuestion.code}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, code: e.target.value })
              }
              rows={8}
              className="p-3 rounded-lg border border-gray-300 shadow-sm font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-300"
            ></textarea>
          )}

          {/* OPTIONS */}
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
              className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-300"
            />
          ))}

          {/* CORRECT OPTION DROPDOWN */}
          <select
            value={newQuestion.correct}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, correct: e.target.value })
            }
            className="p-3 rounded-lg border border-purple-400 focus:ring-2 focus:ring-purple-300"
          >
            <option value="">Select Correct Option</option>
            {newQuestion.options.map((o, i) => (
              <option key={i} value={o}>
                Option {i + 1} — {o || "(empty)"}
              </option>
            ))}
          </select>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-xl shadow-md hover:bg-green-700 transition text-lg font-semibold"
          >
            ➕ Add Question
          </button>
        </form>

        {/* EXISTING QUESTIONS TABLE */}
        <h3 className="text-xl font-bold mb-4">📋 Existing Questions</h3>

        {questions.length === 0 ? (
          <p className="text-gray-600 text-center">No questions added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left text-sm rounded-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Question</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Correct</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {questions.map((q, i) => (
                  <tr key={q.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{q.question}</td>
                    <td className="p-3 text-blue-600">{q.category}</td>
                    <td className="p-3 text-indigo-600">{q.questionType}</td>
                    <td className="p-3 text-green-700">{q.correct}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        🗑 Delete
                      </button>
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

export default AdminQuestions;
