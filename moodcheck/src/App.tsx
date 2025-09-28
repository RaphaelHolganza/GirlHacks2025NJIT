// App.tsx
import { useState, useEffect, useRef } from "react";
import { QUESTIONS, ANSWER_OPTIONS, computeScore } from "./burnout";
import { promptGemini } from "./gemini";
import { getPrompt } from "./prompts";
import "./App.css";

type Answer = 0 | 1 | 2 | 3;

export default function App() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [aiResponse, setAiResponse] = useState<string>("");
  const aiRequestedRef = useRef(false); //ask what even is this for

  const total = QUESTIONS.length;
  const filled = done ? total : idx; // # answered so far
  const pct = (filled / total) * 100;

  const handleAnswer = (value: Answer) => {
    setAnswers((prev) => {
      const next = [...prev]; // next: Answer[]
      next[idx] = value; // value: Answer
      return next;
    });

    if (idx + 1 < QUESTIONS.length) setIdx(idx + 1);
    else {
      // finished answering → show loader for 3s, then results
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 3000);
    }
  };

  const score: number | null = done ? computeScore(answers) : null;

  const reset = () => {
    setIdx(0);
    setAnswers([]);
    setDone(false);
    setLoading(false);
    setAiResponse("");
    aiRequestedRef.current = false;
  };

  useEffect(() => {
    if (!done || score === null || aiRequestedRef.current) return;
    aiRequestedRef.current = true;
    setLoading(true);

    const prompt = getPrompt(score);

    promptGemini(prompt)
      .then((text) => setAiResponse(text))
      .catch((err) => setAiResponse(`(AI error) ${String(err)}`))
      .finally(() => setLoading(false));
  }, [done, score]);

  return (
    <div className="survey">
      <div className="progress">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {loading && (
        <div className="loader-wrap">
          {/* Option A: CSS spinner */}
          <div className="spinner" aria-label="Loading" />
          <p>🌿 Hygenia is thinking...</p>
        </div>
      )}

      {!loading && !done && (
        <div key={idx} className="qa slide-in">
          <p className="survey-question">{QUESTIONS[idx]}</p>
          <div className="survey-options">
            {ANSWER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="survey-btn"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!loading && done && (
        <div className="survey-results">
          <h2>Score: {score} / 30</h2>
          <div className="ai-panel">
            <div className="ai-panel-title">🌿 Hygenia says:</div>
            <pre className="ai-panel-text">{aiResponse}</pre>
          </div>
          <button onClick={reset} className="survey-restart-btn">
            Retake
          </button>
        </div>
      )}
    </div>
  );
}
