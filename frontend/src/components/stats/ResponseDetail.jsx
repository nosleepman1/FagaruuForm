import { QUESTIONS_MAP, formatAnswerValue, groupQuestionsBySection, SECTIONS } from "../../utils/questionsMap";

export default function ResponseDetail({ response }) {
  if (!response) {
    return <p style={{ color: "var(--text-muted)" }}>Aucune réponse sélectionnée</p>;
  }

  const grouped = groupQuestionsBySection(response);
  const respondentName = response.Q44_prenom || response.Q44 || "Répondant";
  const respondentDate = new Date(response.createdAt || response.submittedAt).toLocaleDateString("fr-FR");

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
        <h2 style={{ margin: 0, fontSize: 22, color: "var(--text)" }}>
          Réponse de <strong>{respondentName}</strong>
        </h2>
        <p style={{ marginTop: 8, color: "var(--text-muted)", fontSize: 13 }}>
          Soumis le {respondentDate}
        </p>
      </div>

      {/* Sections */}
      <div style={{ display: "grid", gap: 24 }}>
        {SECTIONS.map((section) => {
          const answers = grouped[section] || {};
          if (Object.keys(answers).length === 0) return null;

          return (
            <div key={section} style={{ background: "var(--surface2)", borderRadius: 16, padding: 20 }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>
                {section}
              </h3>

              <div style={{ display: "grid", gap: 14 }}>
                {Object.entries(answers).map(([qId, value]) => {
                  const question = QUESTIONS_MAP[qId];
                  if (!question || question.parent) return null; // Skip parent field questions

                  return (
                    <div key={qId} style={{ borderRadius: 12, padding: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8 }}>
                        {qId}: {question.label}
                      </div>
                      <div style={{ fontSize: 15, color: "var(--text)", fontWeight: 500 }}>
                        {question.type === "scale" ? (
                          <span style={{ display: "inline-block", background: "var(--primary)", color: "#000", padding: "4px 10px", borderRadius: 6 }}>
                            {value}/5
                          </span>
                        ) : Array.isArray(value) ? (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {value.map((v, idx) => (
                              <span key={idx} style={{ background: "var(--accent)", color: "#000", padding: "6px 12px", borderRadius: 8, fontSize: 13 }}>
                                {v}
                              </span>
                            ))}
                          </div>
                        ) : (
                          formatAnswerValue(value)
                        )}
                      </div>

                      {/* Show parent field if it has a value */}
                      {QUESTIONS_MAP[qId + "_autre"] && answers[qId + "_autre"] && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP[qId + "_autre"].label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers[qId + "_autre"])}
                          </div>
                        </div>
                      )}

                      {/* Show parent field for Q3, Q4, Q6, Q10 */}
                      {qId === "Q3" && answers.Q3_ville && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q3_ville.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q3_ville)}
                          </div>
                        </div>
                      )}
                      {qId === "Q4" && answers.Q4_autre && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q4_autre.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q4_autre)}
                          </div>
                        </div>
                      )}
                      {qId === "Q6" && answers.Q6_autre && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q6_autre.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q6_autre)}
                          </div>
                        </div>
                      )}
                      {qId === "Q10" && answers.Q10_autre && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q10_autre.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q10_autre)}
                          </div>
                        </div>
                      )}
                      {qId === "Q17" && answers.Q17_detail && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q17_detail.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q17_detail)}
                          </div>
                        </div>
                      )}
                      {qId === "Q29" && answers.Q29_groupe && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q29_groupe.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q29_groupe)}
                          </div>
                        </div>
                      )}
                      {qId === "Q31" && answers.Q31_autre && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q31_autre.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q31_autre)}
                          </div>
                        </div>
                      )}
                      {qId === "Q32" && answers.Q32_detail && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q32_detail.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q32_detail)}
                          </div>
                        </div>
                      )}
                      {qId === "Q35" && answers.Q35_autre && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q35_autre.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q35_autre)}
                          </div>
                        </div>
                      )}
                      {qId === "Q23" && answers.Q23_autre && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                            → {QUESTIONS_MAP.Q23_autre.label}
                          </div>
                          <div style={{ fontSize: 14, color: "var(--text)" }}>
                            {formatAnswerValue(answers.Q23_autre)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
