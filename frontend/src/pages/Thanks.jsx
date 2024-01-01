import { useNavigate } from "react-router-dom";

export default function ThanksPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: "var(--primary)" }}>Merci pour votre participation !</h1>
      <p style={{ color: "var(--text-dim)", maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>
        Vos réponses contribuent à faire avancer FAGARUU, une solution de santé digitale adaptée aux besoins du Sénégal.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 360 }}>
        <button onClick={() => navigate('/')} style={buttonStyle('secondary')}>Soumettre une autre réponse</button>
        <button onClick={() => navigate('/stats')} style={buttonStyle('primary')}>Voir les statistiques administrateur</button>
      </div>
      <p style={{ marginTop: 24, fontSize: 13, color: "var(--text-muted)" }}>FAGARUU · Groupe AMBO TECH · Keur Massar, Dakar</p>
    </div>
  );
}

function buttonStyle(variant) {
  return {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: variant === "primary" ? "var(--primary)" : "var(--surface2)",
    color: variant === "primary" ? "#000" : "var(--text)",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: variant === "primary" ? "0 10px 24px rgba(0,200,150,0.16)" : "none"
  };
}
