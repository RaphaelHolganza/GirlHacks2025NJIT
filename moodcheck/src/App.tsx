import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;
    // temporary: just add the question as a “fake answer”
    setAnswers((prev) => [question, ...prev].slice(0, 10));
    setQuestion("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Ask a Question</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </form>

      <ul className="space-y-2">
        {answers.map((a, i) => (
          <li key={i} className="border p-2 rounded bg-gray-50">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
