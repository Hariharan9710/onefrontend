import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface CandidateStartTestProps {
  candidate: {
    id: number;
    candidate_email: string;
    username: string;
  };
}
  
const CandidateStartTest: React.FC<CandidateStartTestProps> = ({ candidate }) => {
  const navigate = useNavigate();
  
  const handleStartTest = async () => {
    try {
      const res = await api.post("/tests/start", { candidate_id: candidate.id });

      if (res.data?.questions && res.data?.test_id) {
        const test_id = res.data.test_id;
        const questions = res.data.questions;

        // ✔ Save questions for TestPage
        sessionStorage.setItem("testQuestions", JSON.stringify(questions));

        // ✔ Save active test for timer, resume etc.
        localStorage.setItem(
          "activeTest",
          JSON.stringify({
            test_id,
            questions,
            answers: {},
            startTime: Date.now(),
            duration: 1200, // 20 minutes
          })
        );

        // ✔ Correct route to test page
        navigate(`/interview/tests/${test_id}`);
      } else {
        alert("❌ Failed to start test.");
      }
    } catch (err: any) {
      if (err.response?.status === 403) {
        alert("⚠️ You have already completed the test!");
      } else if (err.response?.status === 400) {
        alert("⚠️ No generated test found. Admin must generate test first.");
      } else {
        alert("❌ Something went wrong while starting the test.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full text-gray-800 transition-all hover:-translate-y-1 duration-300 border border-yellow-100">
        <h1 className="text-3xl font-bold text-center text-yellow-700 mb-6">
          🎯 Welcome, {candidate.username || candidate.candidate_email}!
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Please read the following instructions carefully before starting your aptitude test.
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8">
          <li>The test consists of 10 multiple-choice questions.</li>
          <li>You will have <span className="font-semibold text-yellow-700">20 minutes</span> to complete the test.</li>
          <li>Each correct answer carries 10 marks. No negative marking.</li>
          <li>Once you submit, you cannot retake the test.</li>
          <li>Do not refresh or close the browser during the test.</li>
          <li>Your results will be reviewed by HR after submission.</li>
        </ul>

        <div className="flex justify-center">
          <button
            onClick={handleStartTest}
            className="px-10 py-3 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 shadow-md"
          >
            🚀 Start Test
          </button>
        </div>

        <p className="text-sm text-center text-gray-400 mt-8">
          © 2025 Office Management System
        </p>
      </div>
    </div>
  );
};

export default CandidateStartTest;
