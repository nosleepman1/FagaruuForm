import { useEffect, useMemo, useState } from "react";
import { useStats } from "../../hooks/useStats";
import { useResponses } from "../../hooks/useResponses";
import { useResponseDetail } from "../../hooks/useResponseDetail";
import ResponseDetail from "./ResponseDetail";
import StatsCharts from "./StatsCharts";

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE;

export default function AdminStatsPage() {
  const [authorized, setAuthorized] = useState(false);
  const [code, setCode] = useState("");
  const [showResponses, setShowResponses] = useState(false);
  const [selectedResponseId, setSelectedResponseId] = useState(null);

  const { data: stats, loading: statsLoading, error: statsError, execute: loadStats } = useStats();
  const { data: responseListData, loading: responsesLoading, error: responsesError, execute: loadResponses } = useResponses();
  const { data: responseDetailData, loading: responseDetailLoading, error: responseDetailError, execute: loadResponseDetail } = useResponseDetail();

  const responses = responseListData?.responses || [];
  const selectedResponse = responseDetailData?.response || null;

  useEffect(() => {
    if (authorized) {
      loadStats();
    }
  }, [authorized, loadStats]);

  useEffect(() => {
    if (showResponses) {
      loadResponses({ page: 1, limit: 20 });
    }
  }, [showResponses, loadResponses]);

  useEffect(() => {
    if (selectedResponseId) {
      loadResponseDetail(selectedResponseId);
    }
  }, [selectedResponseId, loadResponseDetail]);

  const statsCards = useMemo(() => {
    const teleconsultation = stats?.teleconsultation || {};
    const confiance = stats?.confiance || {};
    const engagement = stats?.engagement || {};
    
    const totalQ44 = Object.values(engagement?.Q44 || {}).reduce((a, b) => a + b, 0) || 0;
    const yesQ44 = engagement?.Q44?.["Oui"] || 0;
    const pctQ44 = totalQ44 > 0 ? Math.round((yesQ44 / totalQ44) * 100) : 0;

    return [
      { label: "Réponses totales", value: stats?.total ?? 0, color: "var(--primary)" },
      { label: "Confiance diagnostic", value: teleconsultation?.Q22?.avg ? `${teleconsultation.Q22.avg.toFixed(1)}/5` : "—", color: "#6ee7f7" },
      { label: "Confiance données", value: confiance?.Q39?.avg ? `${confiance.Q39.avg.toFixed(1)}/5` : "—", color: "#a78bfa" },
      { label: "Intérêt pilote", value: `${pctQ44}%`, color: "var(--accent)" }
    ];
  }, [stats]);

  const handleAuth = () => {
    if (!ACCESS_CODE) {
      alert("Le code d'accès administrateur n'est pas configuré.");
      return;
    }
    if (code.trim() === ACCESS_CODE.trim()) {
      setAuthorized(true);
      setCode("");
    } else {
      alert("Code d'accès incorrect.");
    }
  };

  if (!authorized) {
    return (
      <div style={{ minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 420, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, boxShadow: "var(--shadow)" }}>
          <h1 style={{ fontSize: 24, marginBottom: 16, color: "var(--text)" }}>Espace administrateur</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.65 }}>
            Entrez le code d'accès AMBOTECH pour consulter les statistiques et les avis des répondants.
          </p>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code d'accès"
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid var(--border)", marginBottom: 18, background: "var(--surface2)", color: "var(--text)" }}
            type="password"
            onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
          />
          <button onClick={handleAuth} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "var(--primary)", color: "#000", fontWeight: 700, cursor: "pointer" }}>
            Valider
          </button>
        </div>
      </div>
    );
  }

  if (statsLoading || !stats) {
    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 64px" }}>
        <p style={{ color: "var(--text-muted)" }}>Chargement des statistiques...</p>
      </div>
    );
  }

  if (statsError) {
    return <ErrorState msg="Impossible de charger les statistiques." />;
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 64px" }}>
      {/* Header */}
      <header style={{ marginBottom: 32 }}>
        <p style={{ color: "var(--primary)", fontWeight: 700, marginBottom: 8 }}>📊 Dashboard administrateur</p>
        <h1 style={{ fontSize: 32, lineHeight: 1.2, color: "var(--text)", marginBottom: 12 }}>Analyse des réponses FAGARUU</h1>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 720 }}>
          Vue d'ensemble des statistiques et des avis des répondants. Sélectionnez une réponse pour consulter les détails complets.
        </p>
      </header>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {statsCards.map((card) => (
          <div key={card.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, minHeight: 100 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: card.color, marginBottom: 12 }}>{card.value}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Visualisations</h2>
        <StatsCharts stats={stats} />
      </div>

      {/* Responses List */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Liste des réponses</h2>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 13 }}>Cliquez sur une réponse pour voir les détails complets</p>
          </div>
          <button 
            onClick={() => setShowResponses((value) => !value)} 
            style={{ 
              padding: "10px 20px", 
              borderRadius: 10, 
              border: "none", 
              background: "var(--primary)", 
              color: "#000", 
              fontWeight: 700, 
              cursor: "pointer",
              fontSize: 14,
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            {showResponses ? "Masquer" : "Afficher"} les réponses
          </button>
        </div>

        {showResponses && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, boxShadow: "var(--shadow)" }}>
            {responsesLoading && <p style={{ color: "var(--text-muted)" }}>Chargement des réponses...</p>}
            {responsesError && <ErrorState msg="Impossible de charger les réponses." />}
            {!responsesLoading && !responsesError && responses.length === 0 && <EmptyState msg="Aucune réponse disponible." />}
            {!responsesLoading && responses.length > 0 && (
              <div style={{ display: "grid", gap: 12 }}>
                {responses.map((item) => (
                  <button 
                    key={item._id} 
                    type="button" 
                    onClick={() => setSelectedResponseId(item._id)} 
                    style={{
                      textAlign: "left",
                      width: "100%",
                      padding: 16,
                      borderRadius: 12,
                      border: selectedResponseId === item._id ? "2px solid var(--primary)" : "1px solid var(--border)",
                      background: selectedResponseId === item._id ? "var(--surface2)" : "transparent",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "var(--surface2)"}
                    onMouseLeave={(e) => e.target.style.background = selectedResponseId === item._id ? "var(--surface2)" : "transparent"}
                  >
                    <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>
                      {item.Q44_prenom || item.Q44 || "Répondant anonyme"}
                    </div>
                    <div style={{ marginTop: 6, fontSize: 12, color: "var(--text-muted)" }}>
                      {new Date(item.createdAt).toLocaleDateString("fr-FR")} • ID: {item._id.slice(-6)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Response Detail Modal */}
      {selectedResponse && (
        <div 
          onClick={() => setSelectedResponseId(null)}
          style={{ 
            position: "fixed", 
            inset: 0, 
            display: "flex", 
            alignItems: "flex-start", 
            justifyContent: "center", 
            background: "rgba(15, 23, 42, 0.65)", 
            padding: 20, 
            zIndex: 1000,
            overflowY: "auto"
          }}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: "100%", 
              maxWidth: 900, 
              background: "var(--surface)", 
              borderRadius: 20, 
              padding: 28,
              boxShadow: "0 25px 80px rgba(0,0,0,0.25)",
              marginTop: 20,
              marginBottom: 20
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 24, color: "var(--text)" }}>Détails de la réponse</h2>
              <button 
                onClick={() => setSelectedResponseId(null)} 
                style={{ 
                  border: "none", 
                  background: "transparent", 
                  color: "var(--text-muted)", 
                  cursor: "pointer", 
                  fontSize: 28,
                  fontWeight: "bold",
                  padding: "0 8px"
                }}
              >
                ✕
              </button>
            </div>
            {responseDetailLoading && <p style={{ color: "var(--text-muted)" }}>Chargement du détail...</p>}
            {responseDetailError && <ErrorState msg="Impossible de charger la réponse." />}
            {!responseDetailLoading && !responseDetailError && <ResponseDetail response={selectedResponse} />}
          </div>
        </div>
      )}
    </div>
  );
}

function ErrorState({ msg }) {
  return <p style={{ color: "#ef4444", fontSize: 14 }}>{msg}</p>;
}

function EmptyState({ msg }) {
  return <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{msg}</p>;
}
