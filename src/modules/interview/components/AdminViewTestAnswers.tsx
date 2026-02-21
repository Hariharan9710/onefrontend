import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface TestAnswer {
  question_id: number;
  question: string;
  options: string[];
  selected_answer: string;
  correct_answer: string;
  is_correct: number;
}

export default function AdminViewTestAnswers() {
  const { testId } = useParams();
  const [answers, setAnswers] = useState<TestAnswer[]>([]);

  useEffect(() => {
    api.get(`/tests/answers/${testId}`)
      .then(res => setAnswers(res.data))
      .catch(err => console.log(err));
  }, [testId]);

  return (
    <div className="container mt-4">
      <h2>Test Answers (Test ID: {testId})</h2>
      <hr />

      {answers.map((item, index) => (
        <div key={index} className="card mt-3 p-3">

          {/* QUESTION */}
          <h5>Q{index + 1}. {item.question}</h5>

          {/* OPTIONS LIST */}
          <ul className="mt-2">
            {item.options?.map((opt, idx) => (
              <li
                key={idx}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  marginBottom: "6px",
                  background:
                    opt === item.correct_answer
                      ? "#d4edda" // green light
                      : opt === item.selected_answer
                      ? "#d1ecf1" // blue light
                      : "#f8f9fa",
                  fontWeight:
                    opt === item.correct_answer || opt === item.selected_answer
                      ? "bold"
                      : "normal"
                }}
              >
                {opt}
              </li>
            ))}
          </ul>

          {/* SELECTED */}
          <p className="mt-2">
            <strong>Selected Answer:</strong>{" "}
            <span style={{ color: "#0c5460" }}>{item.selected_answer}</span>
          </p>

          {/* CORRECT */}
          <p>
            <strong>Correct Answer:</strong>{" "}
            <span style={{ color: "green" }}>{item.correct_answer}</span>
          </p>

          {/* STATUS */}
          <p className="mt-2">
            <strong>Status:</strong>{" "}
            {item.is_correct === 1 ? (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Correct ✔
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Wrong ✘
              </span>
            )}
          </p>

        </div>
      ))}
    </div>
  );
}
