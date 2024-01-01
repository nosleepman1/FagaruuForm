import { useState } from "react";

// Color system
const colors = {
  green: "#00e6a8",
  blue: "#06b6d4",
  purple: "#8b5cf6",
  orange: "#ff7a45",
  yellow: "#eab308",
  pink: "#ec4899",
  teal: "#14b8a6",
  red: "#ff5c6c"
};

const glassCard = {
  background: "rgba(255, 255, 255, 0.035)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.07)",
  borderRadius: 20,
  transition: "all 0.3s ease-in-out",
};

// Standardize aggregate array and object properties
function standardizeData(data) {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.filter(d => d && d._id !== null && d._id !== undefined && d._id !== "");
  }
  return Object.entries(data).map(([key, val]) => ({
    _id: key,
    count: typeof val === "number" ? val : (val?.count ?? 0)
  })).filter(d => d._id !== "");
}

// ─── Timeline / Réponses par jour Component ──────────────────────────────────
function CustomTimelineCard({ data }) {
  const items = standardizeData(data);
  const [hovered, setHovered] = useState(null);

  if (items.length === 0) return null;
  const max = Math.max(...items.map(d => d.count)) || 1;

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{
      ...glassCard,
      padding: "24px 28px",
      marginBottom: 32,
      position: "relative",
      overflow: "visible"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "'DM Mono', monospace" }}>
          Réponses par jour
        </h3>
        {hovered && (
          <div style={{
            background: "rgba(12, 18, 32, 0.95)",
            border: "1px solid rgba(0,230,168,0.3)",
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 12,
            color: "var(--text)",
            fontFamily: "'DM Mono', monospace",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            animation: "countUp 0.15s ease-out"
          }}>
            <span style={{ color: "#00e6a8", fontWeight: 700 }}>{hovered.count}</span> réponse{hovered.count > 1 ? "s" : ""} le {formatDate(hovered.date)}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, paddingBottom: 4, position: "relative" }}>
        {/* Background grid lines */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "rgba(255,255,255,0.03)" }} />

        {items.map((d, idx) => {
          const heightPct = Math.max(12, (d.count / max) * 100);
          const isCurrentHovered = hovered?.date === d._id;

          return (
            <div
              key={d._id || idx}
              onMouseEnter={() => setHovered({ date: d._id, count: d.count })}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1,
                minWidth: 8,
                height: `${heightPct}%`,
                background: isCurrentHovered
                  ? "linear-gradient(to top, #00b4d8, #00e6a8)"
                  : "linear-gradient(to top, rgba(0, 230, 168, 0.1), #00e6a8)",
                borderRadius: "3px 3px 0 0",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                boxShadow: isCurrentHovered ? "0 0 10px rgba(0,230,168,0.4)" : "none",
                opacity: hovered && !isCurrentHovered ? 0.45 : 0.95
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 8 }}>
        <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>{formatDate(items[0]?._id)}</span>
        <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>{formatDate(items[items.length - 1]?._id)}</span>
      </div>
    </div>
  );
}

// ─── Custom Progress Bar Card Component ──────────────────────────────────────
function CustomProgressBarsCard({ title, data, total, color = "#00e6a8" }) {
  const items = standardizeData(data);

  if (items.length === 0) {
    return (
      <div style={{ ...glassCard, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 120 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "'DM Mono', monospace" }}>
          {title}
        </h3>
        <p style={{ color: "var(--text-dim)", fontSize: 12 }}>Aucune donnée disponible</p>
      </div>
    );
  }

  const max = Math.max(...items.map(i => i.count)) || 1;

  return (
    <div style={{
      ...glassCard,
      padding: "24px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      transition: "transform 0.3s, border-color 0.3s"
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
    >
      <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "'DM Mono', monospace" }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, idx) => {
          const count = item.count;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const barW = (count / max) * 100;

          return (
            <div key={item._id || idx} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, maxWidth: "72%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={item._id}>
                  {item._id || "Inconnu"}
                </span>
                <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                  {count} <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: 11 }}>({pct}%)</span>
                </span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${barW}%`,
                  background: color,
                  borderRadius: 4,
                  transition: "width 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: `0 0 6px ${color}33`
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Custom Score Card (Stars / Scales) Component ───────────────────────────
function CustomScoreCard({ title, data, color = "#8b5cf6" }) {
  const avg = data?.avg || 0;
  const count = data?.count || 0;
  const filled = Math.round(avg);

  return (
    <div style={{
      ...glassCard,
      padding: "24px 22px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: 180,
      transition: "transform 0.3s, border-color 0.3s"
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
    >
      <h3 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "'DM Mono', monospace" }}>
        {title}
      </h3>
      <div style={{ textAlign: "center", margin: "14px 0 6px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 12 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: n <= filled ? color : "rgba(255,255,255,0.05)",
              boxShadow: n <= filled ? `0 0 8px ${color}33` : "none",
              border: n <= filled ? `1px solid ${color}aa` : "1px solid rgba(255,255,255,0.04)",
              transition: "all 0.25s ease"
            }} />
          ))}
        </div>
        <div style={{ fontSize: 34, fontWeight: 800, color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>
          {avg.toFixed(1)}
          <span style={{ fontSize: 16, color: "var(--text-muted)", fontWeight: 400 }}> / 5</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>
          {count} réponse{count > 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-Navigation Tabs ─────────────────────────────────────────────────────
const SUB_TABS = [
  { id: "overview", label: "Vue d'ensemble" },
  { id: "profil", label: "Profil" },
  { id: "teleconsultation", label: "Téléconsultation" },
  { id: "sources_info", label: "Sources d'info" },
  { id: "freins", label: "Freins" },
  { id: "attentes", label: "Attentes FAGARUU" },
  { id: "module_anonyme", label: "Module anonyme" },
  { id: "confiance", label: "Confiance" },
  { id: "numerique", label: "Numérique" }
];

export default function StatsCharts({ stats }) {
  const [activeSection, setActiveSection] = useState("overview");

  if (!stats) return null;
  const total = stats.total || 0;

  return (
    <div>
      {/* RÉPONSES PAR JOUR (Timeline permanent) */}
      {stats.timeline && <CustomTimelineCard data={stats.timeline} />}

      {/* Sub-tabs list */}
      <div style={{
        display: "flex", gap: 5, marginBottom: 28, padding: 5,
        ...glassCard, borderRadius: 14, width: "fit-content",
        overflowX: "auto", maxWidth: "100%", whiteSpace: "nowrap"
      }}>
        {SUB_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: "8px 18px",
              borderRadius: 10,
              border: "none",
              background: activeSection === tab.id ? "rgba(0, 230, 168, 0.12)" : "transparent",
              color: activeSection === tab.id ? "#00e6a8" : "#8899aa",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s ease-in-out"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sub-tab Content Grids */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
        animation: "fadeIn 0.4s ease-out"
      }} key={activeSection}>

        {/* 1. VUE D'ENSEMBLE */}
        {activeSection === "overview" && (
          <>
            <CustomProgressBarsCard title="Tranches d'âge" data={stats.profil?.Q1} total={total} color={colors.green} />
            <CustomProgressBarsCard title="Sexe" data={stats.profil?.Q2} total={total} color={colors.purple} />
            <CustomProgressBarsCard title="Zone de résidence" data={stats.profil?.Q3} total={total} color={colors.blue} />
            <CustomProgressBarsCard title="Utiliserait FAGARUU" data={stats.teleconsultation?.Q18} total={total} color={colors.orange} />
          </>
        )}

        {/* 2. PROFIL */}
        {activeSection === "profil" && (
          <>
            <CustomProgressBarsCard title="Tranches d'âge" data={stats.profil?.Q1} total={total} color={colors.green} />
            <CustomProgressBarsCard title="Sexe" data={stats.profil?.Q2} total={total} color={colors.purple} />
            <CustomProgressBarsCard title="Zone géographique" data={stats.profil?.Q3} total={total} color={colors.blue} />
            <CustomProgressBarsCard title="Situation professionnelle" data={stats.profil?.Q4} total={total} color={colors.yellow} />
            <CustomProgressBarsCard title="Niveau d'études" data={stats.profil?.Q5} total={total} color={colors.pink} />
            <CustomProgressBarsCard title="Langues parlées" data={stats.profil?.Q6} total={total} color={colors.teal} />
          </>
        )}

        {/* 3. TÉLÉCONSULTATION */}
        {activeSection === "teleconsultation" && (
          <>
            <CustomScoreCard title="Confiance diagnostic à distance" data={stats.teleconsultation?.Q22} color={colors.purple} />
            <CustomProgressBarsCard title="Prêt à téléconsulter" data={stats.teleconsultation?.Q18} total={total} color={colors.blue} />
            <CustomProgressBarsCard title="Motifs de téléconsultation" data={stats.teleconsultation?.Q19} total={total} color={colors.purple} />
            <CustomProgressBarsCard title="Mode de téléconsultation préféré" data={stats.teleconsultation?.Q20} total={total} color={colors.orange} />
          </>
        )}

        {/* 4. SOURCES D'INFO */}
        {activeSection === "sources_info" && (
          <>
            <CustomProgressBarsCard title="Type d'informations recherchées" data={stats.assistant?.Q36} total={total} color={colors.blue} />
            <CustomProgressBarsCard title="Usages envisagés de l'assistant" data={stats.assistant?.Q37} total={total} color={colors.green} />
            <CustomProgressBarsCard title="Langue d'interaction de l'assistant" data={stats.assistant?.Q35} total={total} color={colors.yellow} />
          </>
        )}

        {/* 5. FREINS */}
        {activeSection === "freins" && (
          <>
            <CustomProgressBarsCard title="Freins à la consultation médicale" data={stats.acces?.Q10} total={total} color={colors.red} />
            <CustomProgressBarsCard title="Coût d'une consultation" data={stats.acces?.Q11} total={total} color={colors.orange} />
            <CustomProgressBarsCard title="Temps d'attente moyen" data={stats.acces?.Q9} total={total} color={colors.yellow} />
            <CustomProgressBarsCard title="Distance de la structure de santé" data={stats.acces?.Q8} total={total} color={colors.orange} />
            <CustomProgressBarsCard title="Raisons de non-don de sang" data={stats.sang?.Q31} total={total} color={colors.red} />
          </>
        )}

        {/* 6. ATTENTES FAGARUU */}
        {activeSection === "attentes" && (
          <>
            <CustomProgressBarsCard title="Intérêt pour le dossier médical sécurisé" data={stats.dossier?.Q24} total={total} color={colors.green} />
            <CustomProgressBarsCard title="Partage du dossier médical" data={stats.dossier?.Q25} total={total} color={colors.blue} />
            <CustomProgressBarsCard title="Mode de paiement préféré" data={stats.paiement?.Q27} total={total} color={colors.yellow} />
            <CustomProgressBarsCard title="Paiement en pharmacie depuis l'app" data={stats.paiement?.Q28} total={total} color={colors.purple} />
          </>
        )}

        {/* 7. MODULE ANONYME */}
        {activeSection === "module_anonyme" && (
          <>
            <CustomProgressBarsCard title="Connaissance du groupe sanguin" data={stats.sang?.Q29} total={total} color={colors.red} />
            <CustomProgressBarsCard title="Prêt à donner son sang" data={stats.sang?.Q30} total={total} color={colors.orange} />
            <CustomProgressBarsCard title="Notifications d'urgence don de sang" data={stats.sang?.Q33} total={total} color={colors.red} />
            <CustomProgressBarsCard title="Avis sur l'anonymisation des coordonnées" data={stats.sang?.Q34} total={total} color={colors.green} />
            <CustomProgressBarsCard title="Urgence de besoin de sang vécue" data={stats.sang?.Q32} total={total} color={colors.orange} />
          </>
        )}

        {/* 8. CONFIANCE */}
        {activeSection === "confiance" && (
          <>
            <CustomScoreCard title="Confiance sécurité des données" data={stats.confiance?.Q39} color={colors.purple} />
            <CustomProgressBarsCard title="Préoccupations principales" data={stats.confiance?.Q38} total={total} color={colors.purple} />
            <CustomProgressBarsCard title="Garant de la sécurité des données" data={stats.confiance?.Q40} total={total} color={colors.blue} />
          </>
        )}

        {/* 9. NUMÉRIQUE */}
        {activeSection === "numerique" && (
          <>
            <CustomProgressBarsCard title="Type de téléphone utilisé" data={stats.numerique?.Q13} total={total} color={colors.blue} />
            <CustomProgressBarsCard title="Accès régulier à internet" data={stats.numerique?.Q14} total={total} color={colors.teal} />
            <CustomProgressBarsCard title="Services de paiement mobile utilisés" data={stats.numerique?.Q15} total={total} color={colors.yellow} />
            <CustomProgressBarsCard title="Fréquence d'usage des applications" data={stats.numerique?.Q16} total={total} color={colors.purple} />
            <CustomProgressBarsCard title="Aisance avec le paiement mobile" data={stats.paiement?.Q26} total={total} color={colors.green} />
          </>
        )}

      </div>
    </div>
  );
}
