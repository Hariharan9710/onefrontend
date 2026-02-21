import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import AdminAddCandidate from "./components/AdminAddCandidate";
import CandidateLogin from "./components/CandidateLogin";
import CandidateRegisterForm from "./components/CandidateRegisterForm";
import CandidateStartTest from "./components/CandidateStartTestProps";
import TestPage from "./components/Test/TestPage";
import TestSubmitted from "./components/Test/TestSubmitted";
import Results from "./components/Test/Results";
import AdminViewCandidates from "./components/AdminViewCandidates";
import AdminOnboarding from "./components/AdminOnboarding";
import AdminQuestions from "./components/AdminQuestions";
import AdminTestGenerator from "./components/AdminTestGenerator";
import AdminViewTestAnswers from "./components/AdminViewTestAnswers";

interface CandidateData {
  id: number;
  username: string;
  candidate_email: string;
}

const InterviewApp: React.FC = () => {
  const [loggedCandidate, setLoggedCandidate] = useState<CandidateData | null>(
    null
  );

  return (
    <div className="interview-module">
      {/* ✅ Navbar */}
      <nav className="w-full bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/interview"
            className="text-2xl font-bold text-green-700 hover:text-green-800 transition"
          >
            Office Management
          </Link>

          <div className="flex space-x-6 text-gray-600 font-medium">
            <Link
              to="/interview/admin/add-candidate"
              className="hover:text-green-600 transition"
            >
              Admin Add
            </Link>
            <Link
              to="/interview/candidate/login"
              className="hover:text-green-600 transition"
            >
              Candidate Login
            </Link>
            <Link to="/interview/results" className="hover:text-green-600 transition">
              HR Results
            </Link>
            <Link
               to="/interview/admin/view-candidates"
                className="hover:text-green-600 transition"
              >
             View Candidates
              </Link>
 
              <Link to="/interview/hr/onboarding" className="hover:text-green-600 transition">
               HR Onboarding
              </Link>
              <Link to="/interview/admin/questions" className="hover:text-green-600 transition">
                   Manage Questions
               </Link>
              <Link to="/interview/admin/generate-test" className="hover:text-green-600 transition">
               Generate Test
               </Link>
          </div>
        </div>
      </nav>

      {/* ✅ Page Container */}
      <div className="min-h-[85vh] bg-gray-50 py-10 px-6">
        <Routes>
          {/* Default route */}
          <Route
            path="/"
            element={<Navigate to="admin/add-candidate" replace />}
          />

          {/* Admin Add Candidate */}
          <Route path="admin/add-candidate" element={<AdminAddCandidate />} />

          {/* Candidate Login */}
          <Route
            path="candidate/login"
            element={<CandidateLogin onLoginSuccess={setLoggedCandidate} />}
          />

          {/* Candidate Register */}
          <Route
            path="candidate/register"
            element={
              loggedCandidate ? (
                <CandidateRegisterForm candidate={loggedCandidate} />
              ) : (
                <Navigate to="../candidate/login" replace />
              )
            }
          />

          {/* Candidate Start Test (after registration) */}
          <Route
            path="candidate/start-test"
            element={
              loggedCandidate ? (
                <CandidateStartTest candidate={loggedCandidate} />
              ) : (
                <Navigate to="../candidate/login" replace />
              )
            }
          />

          {/* Candidate Test Page */}
          <Route path="tests/:testId" element={<TestPage />} />

          {/* Test Submitted Page */}
          <Route path="test-submitted" element={<TestSubmitted />} />

          {/* HR Results */}
          <Route path="results" element={<Results />} />
          <Route path="admin/view-candidates" element={<AdminViewCandidates />} />
          <Route path="hr/onboarding" element={<AdminOnboarding />} />
          <Route path="admin/questions" element={<AdminQuestions />} />
            <Route path="admin/generate-test" element={<AdminTestGenerator />} />
           <Route path="admin/test-answers/:testId" element={<AdminViewTestAnswers />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="flex flex-col justify-center items-center text-center min-h-[70vh]">
                <h2 className="text-3xl font-bold text-gray-600">
                  🚫 404 — Page Not Found
                </h2>
                <Link
                  to="/interview"
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  🏠 Go Home
                </Link>
              </div>
            }
          />
        </Routes>
      </div>

      {/* ✅ Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Office Management System
      </footer>
    </div>
  );
};

export default InterviewApp;
