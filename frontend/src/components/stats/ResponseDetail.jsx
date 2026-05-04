import { useState } from "react";
import { QUESTIONS_MAP, formatAnswerValue, groupQuestionsBySection, SECTIONS } from "../../utils/questionsMap";

const glassCard = {
  background: "rgba(255,255,255,0.035)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
};

export default function ResponseDetail({ response }) {
  const [activeSection, setActiveSection] = useState(0);

  if (!response) {
    return <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 32 }}>Aucune réponse sélectionnée</p>;
  }

  const grouped = groupQuestionsBySection(response);
  const respondentName = response.Q44_prenom || response.Q44 || "Répondant";
  const respondentDate = new Date(response.createdAt || response.submittedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  const activeSections = SECTIONS.filter(s => {
    const answers = grouped[s] || {};
    return Object.keys(answers).length > 0;
  });

  const currentSection = activeSections[activeSection] || activeSections[0];
  const currentAnswers = grouped[currentSection] || {};

  return (
    <div>
      {/* Respondent info bar */}
      <div style={{
        ...glassCard, padding: "16px 20px", marginBottom: 20,
        display: "flex", alignItems: "center", gap: 14,
        background: "rgba(0,230,168,0.04)",
        border: "1px solid rgba(0,230,168,0.1)"
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: "linear-gradient(135deg, #00e6a8, #06b6d4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, fontWeight: 800, color: "#000"
        }}>{respondentName.charAt(0).toUpperCase()}</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{respondentName}</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>
            Soumis le {respondentDate}
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 20, padding: 5,
        ...glassCard, borderRadius: 14, overflowX: "auto"
      }}>
        {activeSections.map((s, i) => (
          <button key={s} onClick={() => setActiveSection(i)} style={{
            padding: "7px 14px", borderRadius: 10, border: "none",
            background: activeSection === i ? "rgba(0,230,168,0.12)" : "transparent",
            color: activeSection === i ? "#00e6a8" : "#8899aa",
            fontWeight: 600, cursor: "pointer", fontSize: 11, whiteSpace: "nowrap",
            fontFamily: "'Inter', sans-serif", transition: "all 0.2s"
          }}>{s.replace(/^\d+\.\s*/, "")}</button>
        ))}
      </div>

      {/* Section content */}
      <div style={{ display: "grid", gap: 10, animation: "fadeIn 0.3s ease-out" }}>
        {Object.entries(currentAnswers).map(([qId, value]) => {
          const question = QUESTIONS_MAP[qId];
          if (!question || question.parent) return null;

          return (
            <div key={qId} style={{
              ...glassCard, padding: "16px 18px",
              background: "rgba(255,255,255,0.025)"
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: "#8899aa",
                marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.6px",
                fontFamily: "'DM Mono', monospace",
                display: "flex", alignItems: "center", gap: 8
              }}>
                <span style={{
                  padding: "2px 7px", borderRadius: 6,
                  background: "rgba(0,230,168,0.1)", color: "#00e6a8",
                  fontSize: 10, fontWeight: 700
                }}>{qId}</span>
                {question.label}
              </div>
              <div style={{ fontSize: 14, color: "#f0f4f8", fontWeight: 500, lineHeight: 1.6 }}>
                {question.type === "scale" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1,2,3,4,5].map(n => (
                        <div key={n} style={{
                          width: 28, height: 28, borderRadius: 8,
                          background: n <= value ? "linear-gradient(135deg, #00e6a8, #06b6d4)" : "rgba(255,255,255,0.06)",
                          transition: "all 0.2s"
                        }} />
                      ))}
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, color: "#00e6a8" }}>{value}/5</span>
                  </div>
                ) : Array.isArray(value) ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {value.map((v, idx) => (
                      <span key={idx} style={{
                        background: "rgba(139,92,246,0.12)", color: "#a78bfa",
                        padding: "6px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                        border: "1px solid rgba(139,92,246,0.15)"
                      }}>{v}</span>
                    ))}
                  </div>
                ) : (
                  formatAnswerValue(value)
                )}
              </div>

              {/* Extra/child fields */}
              {renderExtra(qId, "Q3_ville", currentAnswers)}
              {renderExtra(qId === "Q4" ? "Q4" : null, "Q4_autre", currentAnswers)}
              {renderExtra(qId === "Q6" ? "Q6" : null, "Q6_autre", currentAnswers)}
              {renderExtra(qId === "Q10" ? "Q10" : null, "Q10_autre", currentAnswers)}
              {renderExtra(qId === "Q17" ? "Q17" : null, "Q17_detail", currentAnswers)}
              {renderExtra(qId === "Q23" ? "Q23" : null, "Q23_autre", currentAnswers)}
              {renderExtra(qId === "Q29" ? "Q29" : null, "Q29_groupe", currentAnswers)}
              {renderExtra(qId === "Q31" ? "Q31" : null, "Q31_autre", currentAnswers)}
              {renderExtra(qId === "Q32" ? "Q32" : null, "Q32_detail", currentAnswers)}
              {renderExtra(qId === "Q35" ? "Q35" : null, "Q35_autre", currentAnswers)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderExtra(parentId, extraId, answers) {
  if (!parentId || !answers[extraId] || !QUESTIONS_MAP[extraId]) return null;
  return (
    <div style={{
      marginTop: 12, paddingTop: 12,
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }}>
      <div style={{ fontSize: 11, color: "#556677", marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>
        → {QUESTIONS_MAP[extraId].label}
      </div>
      <div style={{ fontSize: 13, color: "#8899aa" }}>
        {formatAnswerValue(answers[extraId])}
      </div>
    </div>
  );
}
