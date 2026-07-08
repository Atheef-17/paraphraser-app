import { useState } from "react";
import axios from "axios";
import "./App.css";
import AdPlaceholder from "./AdPlaceholder";

const modes = [
  "Standard",
  "Formal",
  "Simple English",
  "Academic",
  "Creative",
  "Shorten",
  "Expand",
];

function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("Standard");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleParaphrase = async () => {
    if (!text.trim()) {
      alert("Please enter text first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await axios.post("http://localhost:5000/api/paraphrase", {
        text,
        mode,
      });

      setResult(res.data.result);
    } catch {
      setResult("Error: Please check backend server.");
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="card">
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <h1>WriteMate AI</h1>
        <p className="subtitle">Professional AI Writing Assistant</p>
        <p className="small-text">
          Rewrite, improve, and perfect your writing in seconds.
        </p>

        <div className="modes">
          {modes.map((item) => (
            <button
              key={item}
              className={mode === item ? "mode active" : "mode"}
              onClick={() => setMode(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="editor-box">
          <div className="panel">
            <h3>Your Text</h3>

            <textarea
              placeholder="Paste your text here..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setResult("");
              }}
            />

            <small className={wordCount >= 150 ? "limit-text" : ""}>
              {wordCount} / 150 free words
            </small>
          </div>

          <div className="arrow">➜</div>

          <div className="panel">
            <div className="result-head">
              <h3>Paraphrased Result</h3>

              <button
                className="copy-btn"
                onClick={() => {
                  if (!result) return alert("No result to copy.");
                  navigator.clipboard.writeText(result);
                  alert("Copied!");
                }}
              >
                Copy
              </button>
            </div>

            <textarea
              placeholder="Your paraphrased text will appear here..."
              value={result}
              readOnly
            />
          </div>
        </div>

        <button
          className="main-btn"
          onClick={handleParaphrase}
          disabled={loading}
        >
          {loading ? "Paraphrasing..." : "✨ Paraphrase"}
        </button>

        {wordCount >= 150 && result && (
          <div className="adsense-area">
            <AdPlaceholder type="banner" />
          </div>
        )}

        <div className="features">
          <div>
            <b>AI Powered</b>
            <br />
            High-quality paraphrasing.
          </div>

          <div>
            <b>Secure & Private</b>
            <br />
            Your text is safe.
          </div>

          <div>
            <b>Fast & Accurate</b>
            <br />
            Get results quickly.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;