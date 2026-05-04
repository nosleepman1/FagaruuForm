import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./pages/Form";
import StatsPage from "./pages/Stats";
import ThanksPage from "./pages/Thanks";

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "'Sora', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Sora:wght@300;400;500;600;700&display=swap');
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
          .dark-dashboard {
            --bg: #060a13;
            --surface: rgba(255,255,255,0.035);
            --surface2: rgba(255,255,255,0.06);
            --border: rgba(255,255,255,0.08);
            --primary: #00e6a8;
            --primary-dim: rgba(0,230,168,0.12);
            --accent: #ff7a45;
            --accent-dim: rgba(255,122,69,0.12);
            --text: #f0f4f8;
            --text-muted: #8899aa;
            --text-dim: #556677;
            --red: #ff5c6c;
            --shadow: 0 8px 40px rgba(0,0,0,0.4);
            --glass: rgba(255,255,255,0.04);
            --glass-border: rgba(255,255,255,0.07);
            --glow-primary: rgba(0,230,168,0.15);
            --glow-accent: rgba(255,122,69,0.12);
            --glow-purple: rgba(139,92,246,0.12);
            --glow-cyan: rgba(6,182,212,0.12);
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: var(--bg); color: var(--text); }
          ::selection { background: var(--primary); color: #000; }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
          @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes countUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
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
