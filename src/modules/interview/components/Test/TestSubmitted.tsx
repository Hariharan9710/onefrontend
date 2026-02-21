import { Link } from "react-router-dom";

export default function TestSubmitted() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-emerald-600 mb-4">
          ✅ Test Submitted Successfully
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for completing the test. Our HR team will review your performance and contact you if you are shortlisted.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          🏠 Go to Home
        </Link>
      </div>
    </div>
  );
}
