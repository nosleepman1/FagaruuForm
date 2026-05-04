import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./pages/Form";
import StatsPage from "./pages/Stats";
import ThanksPage from "./pages/Thanks";

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "'Sora', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap');
          :root {
            --bg: #ffffff;
            --surface: #f8fafc;
            --surface2: #e2e8f0;
            --border: #cbd5e1;
            --primary: #00c896;
            --primary-dim: rgba(0,200,150,0.1);
            --accent: #ff6b35;
            --accent-dim: rgba(255,107,53,0.1);
            --text: #1e293b;
            --text-muted: #64748b;
            --text-dim: #94a3b8;
            --red: #ef4444;
            --radius: 12px;
            --shadow: 0 4px 24px rgba(0,0,0,0.08);
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: var(--bg); color: var(--text); }
          ::selection { background: var(--primary); color: #000; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: var(--bg); }
          ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
          @media (max-width: 768px) {
            body { font-size: 14px; }
          }
        `}</style>

        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/thanks" element={<ThanksPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
