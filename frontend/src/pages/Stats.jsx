import AdminStatsPage from "../components/stats/AdminStatsPage";

export default function StatsPage() {
  return (
    <main className="dark-dashboard" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060a13 0%, #0c1220 40%, #0a0f1d 100%)",
      padding: "0",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Ambient glow effects */}
      <div style={{
        position: "fixed", top: "-20%", right: "-10%",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(0,230,168,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "fixed", bottom: "-20%", left: "-10%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <AdminStatsPage />
      </div>
    </main>
  );
}
