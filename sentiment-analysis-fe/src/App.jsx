import { useState } from "react";
import "./App.css";

function App() {
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, content: "Great product, really helped me!", sentimentScore: 0.9, sentiment: "POSITIVE" },
    { id: 2, content: "The service was slow and frustrating.", sentimentScore: -0.6, sentiment: "NEGATIVE" },
    { id: 3, content: "It was okay, nothing special.", sentimentScore: 0.0, sentiment: "NEUTRAL" },
  ]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setFeedbackList([...feedbackList, {
      id: feedbackList.length + 1,
      content: feedback,
      sentimentScore: 0.0,
      sentiment: "NEUTRAL",
    }]);
    setFeedback("");
  };

  const getSentimentStyle = (sentiment) => {
    switch (sentiment) {
      case "POSITIVE": return { color: "#34C759", background: "#34C75915", borderRadius: 20, padding: "2px 10px" };
      case "NEGATIVE": return { color: "#FF3B30", background: "#FF3B3015", borderRadius: 20, padding: "2px 10px" };
      default:         return { color: "#FF9500", background: "#FF950015", borderRadius: 20, padding: "2px 10px" };
    }
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Header */}
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>
          Feedback Analyser
        </h1>
        <p style={{ color: "#6E6E73", fontSize: 15, marginBottom: 32 }}>Share your experience and see how it feels.</p>

        {/* Input card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 32 }}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            style={{
              width: "100%", boxSizing: "border-box", border: "1px solid #E5E5EA",
              borderRadius: 10, padding: "12px 14px", fontSize: 15, fontFamily: "inherit",
              color: "#1D1D1F", background: "#F5F5F7", outline: "none", resize: "vertical", marginBottom: 12
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleFeedbackSubmit}
              disabled={!feedback.trim()}
              style={{
                background: feedback.trim() ? "#0071E3" : "#B0B0B5",
                color: "#fff", border: "none", borderRadius: 980,
                padding: "10px 22px", fontSize: 15, fontWeight: 500,
                fontFamily: "inherit", cursor: feedback.trim() ? "pointer" : "not-allowed"
              }}
            >
              Analyse
            </button>
          </div>
        </div>

        {/* History */}
        <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>History</h2>
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          {/* Table head */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px", padding: "10px 20px", background: "#F5F5F7", borderBottom: "1px solid #E5E5EA" }}>
            {["Feedback", "Score", "Sentiment"].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#6E6E73" }}>{h}</span>
            ))}
          </div>
          {/* Rows */}
          {feedbackList.map((item, i) => (
            <div key={item.id} style={{
              display: "grid", gridTemplateColumns: "1fr 80px 100px",
              padding: "14px 20px", alignItems: "center",
              borderBottom: i < feedbackList.length - 1 ? "1px solid #F0F0F0" : "none"
            }}>
              <span style={{ fontSize: 14, color: "#1D1D1F" }}>{item.content}</span>
              <span style={{ fontSize: 14, color: "#6E6E73", fontVariantNumeric: "tabular-nums" }}>{item.sentimentScore}</span>
              <span style={{ fontSize: 12, fontWeight: 600, ...getSentimentStyle(item.sentiment) }}>{item.sentiment}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;