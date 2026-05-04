import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QUESTIONS from "../../questions.json";
import QuestionField from "./QuestionField";
import { useSubmitResponse } from "../../hooks/useSubmitResponse";

export default function UserQuestionnaire() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const startTime = useRef(Date.now());
  const topRef = useRef(null);
  const { execute: submitResponse, loading: submitting } = useSubmitResponse();

  const totalSections = QUESTIONS.length;
  const section = QUESTIONS[currentSection];

  const updateAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const toggleCheckbox = (id, option) => {
    const current = answers[id] || [];
    const next = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
    updateAnswer(id, next);
  };

  const validateSection = () => {
    const sectionErrors = {};
    section.questions.forEach((question) => {
      if (!question.required) return;
      const value = answers[question.id];
      if (question.type === "checkbox") {
        if (!Array.isArray(value) || value.length === 0) sectionErrors[question.id] = "Veuillez sélectionner au moins une option.";
      } else if (question.type === "scale") {
        if (!value) sectionErrors[question.id] = "Veuillez donner une note.";
      } else {
        if (value === undefined || value === "") sectionErrors[question.id] = "Ce champ est obligatoire.";
      }
    });
    return sectionErrors;
  };

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth" });

  const goNext = () => {
    const sectionErrors = validateSection();
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      scrollTop();
      return;
    }

    if (currentSection < totalSections - 1) {
      setCurrentSection((value) => value + 1);
      scrollTop();
    }
  };

  const goBack = () => {
    if (currentSection > 0) {
      setCurrentSection((value) => value - 1);
      scrollTop();
    }
  };

  const submit = async () => {
    const sectionErrors = validateSection();
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      scrollTop();
      return;
    }

    const payload = { ...answers, _duration: Math.round((Date.now() - startTime.current) / 1000) };
    try {
      await submitResponse(payload);
      navigate("/thanks");
    } catch (err) {
      setSubmitError("Impossible d'envoyer le questionnaire, veuillez réessayer.");
    }
  };

  const progress = Math.round(((currentSection + 1) / totalSections) * 100);

  return (
    <section ref={topRef} style={{ maxWidth: 840, margin: "0 auto", padding: "28px 0 64px" }}>
      <header style={{ marginBottom: 24 }}>
        <p style={{ color: "var(--primary)", fontWeight: 700, marginBottom: 8 }}>Questionnaire mobile-first</p>
        <h1 style={{ fontSize: 28, lineHeight: 1.2, color: "var(--text)" }}>Votre avis compte pour FAGARUU</h1>
        <p style={{ marginTop: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7 }}>
          Répondez aux questions en toute simplicité. Ce questionnaire est conçu pour être utilisé sur mobile avant tout.
        </p>
      </header>

      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Section {currentSection + 1} sur {totalSections}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{section.section}</div>
          </div>
          <div style={{ fontSize: 13, color: "var(--primary)", fontWeight: 700 }}>{progress}% complété</div>
        </div>
        <div style={{ marginTop: 12, height: 8, borderRadius: 999, background: "var(--surface2)", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, var(--primary), #00e6a8)", transition: "width 0.3s ease" }} />
        </div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow)" }}>
        <div style={{ padding: "24px 24px 18px", background: "rgba(0,200,150,0.05)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 15, color: "var(--text)", fontWeight: 700 }}>{section.section}</div>
          {section.sectionNote && <p style={{ marginTop: 10, color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6 }}>{section.sectionNote}</p>}
        </div>

        <div style={{ padding: "24px" }}>
          {section.questions.map((question) => (
            <QuestionField
              key={question.id}
              question={question}
              answers={answers}
              value={answers[question.id]}
              error={errors[question.id]}
              extraValue={question.extra ? answers[question.extra.id] : undefined}
              setAnswer={updateAnswer}
              toggleCheckbox={toggleCheckbox}
            />
          ))}

          {submitError && (
            <div style={{ marginTop: 12, color: "var(--red)", fontSize: 14 }}>{submitError}</div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
          <button onClick={goBack} disabled={currentSection === 0} style={navButtonStyle(currentSection === 0)}>
            ← Précédent
          </button>
          {currentSection < totalSections - 1 ? (
            <button onClick={goNext} style={primaryButtonStyle()}>
              Suivant →
            </button>
          ) : (
            <button onClick={submit} disabled={submitting} style={primaryButtonStyle(submitting)}>
              {submitting ? "Envoi en cours…" : "✓ Soumettre mes réponses"}
            </button>
          )}
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 720, lineHeight: 1.6 }}>
          Toutes les réponses sont stockées de manière sécurisée. Vous pouvez fermer cette page après l'envoi.
        </p>
      </div>
    </section>
  );
}

function navButtonStyle(disabled) {
  return {
    padding: "14px 20px",
    minWidth: 140,
    borderRadius: 12,
    border: "1px solid var(--border)",
    background: disabled ? "var(--surface2)" : "transparent",
    color: disabled ? "var(--text-muted)" : "var(--text)",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 700,
    fontSize: 14,
  };
}

function primaryButtonStyle(disabled) {
  return {
    padding: "14px 20px",
    minWidth: 140,
    borderRadius: 12,
    border: "none",
    background: disabled ? "var(--border)" : "linear-gradient(135deg, var(--primary), #00e6a8)",
    color: disabled ? "var(--text-muted)" : "#000",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 700,
    fontSize: 14,
    boxShadow: disabled ? "none" : "0 14px 28px rgba(0,200,150,0.18)",
  };
}
