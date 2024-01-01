export default function QuestionField({ question, answers, value, extraValue, error, setAnswer, toggleCheckbox }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{question.label}</span>
        {question.required && <span style={{ color: "var(--accent)", marginLeft: 6 }}>*</span>}
      </div>

      {question.type === "radio" && (
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {question.options.map((option) => (
            <OptionButton key={option} label={option} active={value === option} onClick={() => setAnswer(question.id, option)} />
          ))}
        </div>
      )}

      {question.type === "checkbox" && (
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {question.options.map((option) => (
            <OptionButton key={option} label={option} active={Array.isArray(value) && value.includes(option)} onClick={() => toggleCheckbox(question.id, option)} checkbox />
          ))}
        </div>
      )}

      {question.type === "scale" && (
        <ScaleInput value={value} min={question.min} max={question.max} onSelect={(option) => setAnswer(question.id, option)} />
      )}

      {question.type === "text" && (
        <input value={value || ""} onChange={(e) => setAnswer(question.id, e.target.value)} placeholder="Votre réponse..." style={inputStyle(error)} />
      )}

      {question.type === "textarea" && (
        <textarea value={value || ""} onChange={(e) => setAnswer(question.id, e.target.value)} rows={4} placeholder="Votre réponse..." style={{ ...inputStyle(error), minHeight: 110, resize: "vertical" }} />
      )}

      {question.extra && (
        <div style={{ marginTop: 14 }}>
          <label style={{ display: "block", marginBottom: 8, color: "var(--text-muted)", fontSize: 13 }}>{question.extra.label}</label>
          <input value={extraValue || ""} onChange={(e) => setAnswer(question.extra.id, e.target.value)} placeholder="Précisez..." style={inputStyle()} />
        </div>
      )}

      {question.conditionals && question.conditionals.map((conditional) => (
        value === conditional.condition && conditional.fields.map((field) => (
          <div key={field.id} style={{ marginTop: 14 }}>
            <label style={{ display: "block", marginBottom: 8, color: "var(--text-muted)", fontSize: 13 }}>{field.label}</label>
            <input value={answers[field.id] || ""} onChange={(e) => setAnswer(field.id, e.target.value)} placeholder="Votre précision..." style={inputStyle()} />
          </div>
        ))
      ))}

      {error && <p style={{ marginTop: 10, color: "var(--red)", fontSize: 13 }}>{error}</p>}
    </div>
  );
}

function OptionButton({ label, active, onClick, checkbox }) {
  return (
    <button onClick={onClick} type="button" style={{
      textAlign: "left",
      padding: "16px 18px",
      minHeight: 56,
      borderRadius: 16,
      border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`,
      background: active ? "rgba(0, 200, 150, 0.14)" : "var(--surface2)",
      color: active ? "var(--text)" : "var(--text-dim)",
      cursor: "pointer",
      fontSize: 14,
      lineHeight: 1.5,
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      fontWeight: active ? 700 : 500,
      boxShadow: active ? "0 8px 20px rgba(0, 200, 150, 0.12)" : "none"
    }}>
      {checkbox && <span style={{ width: 18, height: 18, borderRadius: 5, border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`, background: active ? "var(--primary)" : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", color: active ? "#000" : "transparent", fontWeight: 700 }}>✓</span>}
      <span>{label}</span>
    </button>
  );
}

function ScaleInput({ value, min, max, onSelect }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
        {Array.from({ length: max - min + 1 }, (_, index) => index + min).map((option) => (
          <button key={option} type="button" onClick={() => onSelect(option)} style={{
            padding: "14px 0",
            borderRadius: 12,
            border: `2px solid ${value === option ? "var(--primary)" : "var(--border)"}`,
            background: value === option ? "var(--primary)" : "var(--surface2)",
            color: value === option ? "#000" : "var(--text)",
            fontWeight: 700,
            cursor: "pointer"
          }}>{option}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)" }}>
        <span>1 = Pas du tout</span>
        <span>5 = Totalement</span>
      </div>
    </div>
  );
}

function inputStyle(error) {
  return {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: `1px solid ${error ? "var(--red)" : "var(--border)"}`,
    background: "var(--surface2)",
    color: "var(--text)",
    outline: "none",
    fontSize: 14,
    fontFamily: "inherit"
  };
}
