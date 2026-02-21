import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface CandidateRegisterFormProps {
  candidate: {
    id: number;
    username: string;
    candidate_email: string;
  };
}

interface RegisterDetails {
  candidate_id: number;
  full_name: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
  education: string;
  experience: string;
  skills: string;
  resume_link: string;
}

const CandidateRegisterForm: React.FC<CandidateRegisterFormProps> = ({
  candidate,
}) => {
  const [form, setForm] = useState<RegisterDetails>({
    candidate_id: candidate.id,
    full_name: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
    resume_link: "",
  });

  const navigate = useNavigate(); // ✅ inside component

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/candidate/register-details", form);
      alert("✅ Registration completed successfully!");
      navigate("/interview/candidate/start-test"); // redirect to instruction page
    } catch (err) {
      console.error(err);
      alert("❌ Error saving candidate details!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-6 fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-4xl transition-all hover:shadow-purple-200 hover:-translate-y-1 duration-300">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
          Candidate Registration Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            name="full_name"
            placeholder="Full Name"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            name="gender"
            placeholder="Gender"
            className="input-field"
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            className="input-field"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            className="input-field md:col-span-2 h-24 resize-none"
            onChange={handleChange}
          ></textarea>

          <input
            name="education"
            placeholder="Education"
            className="input-field"
            onChange={handleChange}
          />
          <input
            name="resume_link"
            placeholder="Resume Link"
            className="input-field"
            onChange={handleChange}
          />

          <textarea
            name="experience"
            placeholder="Experience"
            className="input-field md:col-span-2 h-24 resize-none"
            onChange={handleChange}
          ></textarea>

          <textarea
            name="skills"
            placeholder="Skills"
            className="input-field md:col-span-2 h-24 resize-none"
            onChange={handleChange}
          ></textarea>

          <div className="md:col-span-2 text-center mt-2">
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 transition duration-300 shadow-md"
            >
              🚀 Submit & Continue to Test
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500 mt-8">
          © 2025 Office Management System
        </p>
      </div>
    </div>
  );
};

export default CandidateRegisterForm;
