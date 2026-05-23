import { useEffect, useMemo, useState } from "react";
import { useStats } from "../../hooks/useStats";
import { useResponses } from "../../hooks/useResponses";
import { useResponseDetail } from "../../hooks/useResponseDetail";
import ResponseDetail from "./ResponseDetail";
import StatsCharts from "./StatsCharts";

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE;

// ─── Glassmorphism card style ─────────────────────────────────────────────────
const glassCard = {
  background: "rgba(255,255,255,0.035)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 20,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

export default function AdminStatsPage() {
  const [authorized, setAuthorized] = useState(false);
  const [code, setCode] = useState("");
  const [showResponses, setShowResponses] = useState(false);
  const [selectedResponseId, setSelectedResponseId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const { data: stats, loading: statsLoading, error: statsError, execute: loadStats } = useStats();
  const { data: responseListData, loading: responsesLoading, error: responsesError, execute: loadResponses } = useResponses();
  const { data: responseDetailData, loading: responseDetailLoading, error: responseDetailError, execute: loadResponseDetail } = useResponseDetail();

  const responses = responseListData?.responses || [];
  const selectedResponse = responseDetailData?.response || null;

  useEffect(() => { if (authorized) loadStats(); }, [authorized, loadStats]);
  useEffect(() => { if (showResponses) loadResponses({ page: 1, limit: 20 }); }, [showResponses, loadResponses]);
  useEffect(() => { if (selectedResponseId) loadResponseDetail(selectedResponseId); }, [selectedResponseId, loadResponseDetail]);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === "Escape" && selectedResponseId) setSelectedResponseId(null); };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedResponseId]);

  const kpis = useMemo(() => {
    const teleconsultation = stats?.teleconsultation || {};
    const confiance = stats?.confiance || {};
    const engagement = stats?.engagement || {};
    const totalQ44 = Object.values(engagement?.Q44 || {}).reduce((a, b) => a + b, 0) || 0;
    const yesQ44 = engagement?.Q44?.["Oui"] || 0;
    const pctQ44 = totalQ44 > 0 ? Math.round((yesQ44 / totalQ44) * 100) : 0;

    return [
      { label: "Réponses totales", value: stats?.total ?? 0, gradient: "linear-gradient(135deg, #00e6a8, #00b4d8)", glow: "rgba(0,230,168,0.2)" },
      { label: "Connaissance SR", value: teleconsultation?.Q22?.avg ? `${teleconsultation.Q22.avg.toFixed(1)}/5` : "—", gradient: "linear-gradient(135deg, #06b6d4, #8b5cf6)", glow: "rgba(6,182,212,0.2)" },
      { label: "Confiance plateforme", value: confiance?.Q39?.avg ? `${confiance.Q39.avg.toFixed(1)}/5` : "—", gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)", glow: "rgba(139,92,246,0.2)" },
      { label: "Prêts à tester", value: `${pctQ44}%`, gradient: "linear-gradient(135deg, #ff7a45, #f59e0b)", glow: "rgba(255,122,69,0.2)" },
    ];
  }, [stats]);

  const handleAuth = () => {
    if (!ACCESS_CODE) { alert("Le code d'accès administrateur n'est pas configuré."); return; }
    if (code.trim() === ACCESS_CODE.trim()) { setAuthorized(true); setCode(""); }
    else { alert("Code d'accès incorrect."); }
  };

  const handleModalClose = () => setSelectedResponseId(null);
  const handleModalBackdropClick = (e) => { if (e.target === e.currentTarget) handleModalClose(); };

  // ─── Login screen ────────────────────────────────────────────────────────────
  if (!authorized) {
    return (
      <div style={{ minHeight: "calc(100vh - 48px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{
          ...glassCard, width: "100%", maxWidth: 440, padding: "40px 32px",
          animation: "fadeIn 0.6s ease-out",
          boxShadow: "0 0 80px rgba(0,230,168,0.06), 0 8px 40px rgba(0,0,0,0.3)"
        }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #00e6a8, #00b4d8)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.5px" }}>Espace administrateur</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.7, fontSize: 14 }}>
            Entrez le code d'accès pour consulter les statistiques et réponses FAGARUU.
          </p>
          <input
            value={code} onChange={(e) => setCode(e.target.value)}
            placeholder="Code d'accès" type="password"
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            style={{
              width: "100%", padding: "14px 18px", borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.1)", marginBottom: 16,
              background: "rgba(255,255,255,0.05)", color: "var(--text)",
              fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(0,230,168,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,230,168,0.1)"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
          />
          <button onClick={handleAuth} style={{
            width: "100%", padding: "14px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #00e6a8, #00b4d8)",
            color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 15,
            fontFamily: "'Inter', sans-serif",
            transition: "transform 0.15s, box-shadow 0.2s",
            boxShadow: "0 4px 20px rgba(0,230,168,0.3)"
          }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 28px rgba(0,230,168,0.4)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(0,230,168,0.3)"; }}
          >Accéder au dashboard</button>
        </div>
      </div>
    );
  }

  // ─── Loading ─────────────────────────────────────────────────────────────────
  if (statsLoading || !stats) {
    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-block", width: 40, height: 40, border: "3px solid rgba(255,255,255,0.08)", borderTopColor: "#00e6a8", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "var(--text-muted)", marginTop: 16, fontSize: 14 }}>Chargement du dashboard…</p>
      </div>
    );
  }

  if (statsError) return <ErrorState msg="Impossible de charger les statistiques." />;

  const tabs = [
    { id: "overview", label: "Statistiques" },
    { id: "responses", label: "Réponses individuelles" },
  ];

  // ─── Main Dashboard ─────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "32px 24px 80px" }}>
      {/* Header */}
      <header style={{ marginBottom: 40, animation: "fadeIn 0.5s ease-out" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            padding: "6px 14px", borderRadius: 20,
            background: "linear-gradient(135deg, rgba(0,230,168,0.15), rgba(0,180,216,0.1))",
            border: "1px solid rgba(0,230,168,0.2)",
            fontSize: 12, fontWeight: 700, color: "#00e6a8",
            letterSpacing: "0.5px", textTransform: "uppercase",
            fontFamily: "'DM Mono', monospace"
          }}>Dashboard FAGARUU</div>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#00e6a8",
            boxShadow: "0 0 8px rgba(0,230,168,0.6)",
            animation: "pulse 2s ease-in-out infinite"
          }} />
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900,
          background: "linear-gradient(135deg, #f0f4f8, #8899aa)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          letterSpacing: "-1px", lineHeight: 1.2, marginBottom: 8
        }}>Analyse des réponses</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>
          Statistiques en temps réel et détails des répondants au questionnaire.
        </p>
      </header>

      {/* KPI Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20, marginBottom: 40
      }}>
        {kpis.map((kpi, i) => (
          <div key={kpi.label} style={{
            ...glassCard, padding: "24px 22px", position: "relative", overflow: "hidden",
            animation: `slideUp 0.5s ease-out ${i * 0.1}s both`,
            cursor: "default",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${kpi.glow}`; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            {/* Glow circle */}
            <div style={{
              position: "absolute", top: -30, right: -30,
              width: 100, height: 100, borderRadius: "50%",
              background: kpi.glow, filter: "blur(30px)",
              pointerEvents: "none"
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: kpi.gradient, marginBottom: 14, boxShadow: `0 0 12px ${kpi.glow}` }} />
              <div style={{
                fontSize: 36, fontWeight: 800,
                background: kpi.gradient,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontFamily: "'DM Mono', monospace", lineHeight: 1,
                marginBottom: 8, animation: "countUp 0.6s ease-out"
              }}>{kpi.value}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 32, padding: 6,
        ...glassCard, borderRadius: 16, width: "fit-content",
        animation: "fadeIn 0.6s ease-out 0.3s both"
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); if (tab.id === "responses") setShowResponses(true); }}
            style={{
              padding: "10px 22px", borderRadius: 12, border: "none",
              background: activeTab === tab.id ? "rgba(0,230,168,0.12)" : "transparent",
              color: activeTab === tab.id ? "#00e6a8" : "var(--text-muted)",
              fontWeight: 600, cursor: "pointer", fontSize: 14,
              fontFamily: "'Inter', sans-serif", letterSpacing: "-0.2px",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 8
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div style={{ animation: "fadeIn 0.4s ease-out" }}>
          <StatsCharts stats={stats} />
        </div>
      )}

      {/* Responses Tab */}
      {activeTab === "responses" && (
        <div style={{ animation: "fadeIn 0.4s ease-out" }}>
          <div style={{ ...glassCard, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Réponses individuelles</h2>
                <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {responses.length} réponse{responses.length > 1 ? "s" : ""} • Cliquez pour voir les détails
                </p>
              </div>
              <button onClick={() => loadResponses({ page: 1, limit: 20 })} style={{
                padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent", color: "var(--text-muted)", cursor: "pointer",
                fontSize: 13, fontFamily: "'Inter', sans-serif", transition: "all 0.2s"
              }}
                onMouseEnter={(e) => { e.target.style.borderColor = "rgba(0,230,168,0.3)"; e.target.style.color = "#00e6a8"; }}
                onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "var(--text-muted)"; }}
              >↻ Rafraîchir</button>
            </div>

            {responsesLoading && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ display: "inline-block", width: 32, height: 32, border: "3px solid rgba(255,255,255,0.08)", borderTopColor: "#00e6a8", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            {responsesError && <ErrorState msg="Impossible de charger les réponses." />}
            {!responsesLoading && !responsesError && responses.length === 0 && <EmptyState msg="Aucune réponse disponible." />}
            {!responsesLoading && responses.length > 0 && (
              <div style={{ display: "grid", gap: 10 }}>
                {responses.map((item, i) => (
                  <ResponseRow key={item._id} item={item} index={i}
                    isSelected={selectedResponseId === item._id}
                    onClick={() => setSelectedResponseId(item._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Response Detail Modal */}
      {selectedResponseId && (
        <div
          onMouseDown={handleModalBackdropClick}
          style={{
            position: "fixed", inset: 0,
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            padding: 20, zIndex: 1000, overflowY: "auto",
            animation: "backdropIn 0.25s ease-out"
          }}>
          <div
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 920,
              ...glassCard,
              background: "rgba(12, 18, 32, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "32px 28px",
              boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,230,168,0.05)",
              marginTop: 24, marginBottom: 24,
              animation: "modalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
            }}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.3px" }}>Détails de la réponse</h2>
                <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text-muted)" }}>Consultation complète des réponses du participant</p>
              </div>
              <button
                type="button" onClick={handleModalClose}
                style={{
                  width: 40, height: 40, borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--text-muted)", cursor: "pointer",
                  fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s", fontFamily: "'Inter', sans-serif"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,92,108,0.15)"; e.currentTarget.style.color = "#ff5c6c"; e.currentTarget.style.borderColor = "rgba(255,92,108,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >×</button>
            </div>
            {responseDetailLoading && (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ display: "inline-block", width: 32, height: 32, border: "3px solid rgba(255,255,255,0.08)", borderTopColor: "#00e6a8", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            {responseDetailError && <ErrorState msg="Impossible de charger la réponse." />}
            {!responseDetailLoading && !responseDetailError && <ResponseDetail response={selectedResponse} />}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Response Row ────────────────────────────────────────────────────────────
function ResponseRow({ item, index, isSelected, onClick }) {
  const [hov, setHov] = useState(false);
  const date = new Date(item.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <button
      type="button" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left", width: "100%",
        padding: "16px 20px", borderRadius: 14,
        border: isSelected ? "1px solid rgba(0,230,168,0.3)" : "1px solid rgba(255,255,255,0.06)",
        background: isSelected ? "rgba(0,230,168,0.08)" : hov ? "rgba(255,255,255,0.04)" : "transparent",
        cursor: "pointer", transition: "all 0.2s",
        display: "flex", alignItems: "center", gap: 16,
        animation: `slideUp 0.3s ease-out ${index * 0.03}s both`,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Index */}
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: isSelected ? "rgba(0,230,168,0.12)" : "rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 700,
        color: isSelected ? "#00e6a8" : "var(--text-dim)",
        fontFamily: "'DM Mono', monospace"
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Name & date */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 14, marginBottom: 3 }}>
          {item.Q44_prenom || "Répondant anonyme"}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>
          {date} · {item._id.slice(-6)}
        </div>
      </div>

      {/* Quick info badges */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
        {item.Q1 && <QuickBadge text={item.Q1} color="#06b6d4" />}
        {item.Q2 && <QuickBadge text={item.Q2} color="#8b5cf6" />}
        {item.Q44 === "Oui" && <QuickBadge text="Pilote ✓" color="#00e6a8" />}
      </div>

      {/* Arrow */}
      <div style={{ color: isSelected ? "#00e6a8" : "var(--text-dim)", fontSize: 16, flexShrink: 0, transition: "transform 0.2s", transform: hov ? "translateX(3px)" : "none" }}>→</div>
    </button>
  );
}

function QuickBadge({ text, color }) {
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 8,
      background: `${color}18`, color,
      fontSize: 11, fontWeight: 600, whiteSpace: "nowrap"
    }}>{text}</span>
  );
}

function ErrorState({ msg }) {
  return (
    <div style={{ textAlign: "center", padding: 32 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#ff5c6c", marginBottom: 8 }}>Erreur</div>
      <p style={{ color: "#ff5c6c", fontSize: 14, fontWeight: 500 }}>{msg}</p>
    </div>
  );
}

function EmptyState({ msg }) {
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, margin: "0 auto 12px" }} />
      <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{msg}</p>
    </div>
  );
}
