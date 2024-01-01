// Map de toutes les questions du questionnaire avec leurs labels et types
export const QUESTIONS_MAP = {
  // Section 1 - Profil du répondant
  Q1: { label: "Quel est votre âge ?", section: "1. Profil du répondant", type: "radio" },
  Q2: { label: "Quel est votre sexe ?", section: "1. Profil du répondant", type: "radio" },
  Q3: { label: "Dans quelle zone vivez-vous ?", section: "1. Profil du répondant", type: "radio" },
  Q3_ville: { label: "Ville / Commune / Village", section: "1. Profil du répondant", type: "text", parent: "Q3" },
  Q4: { label: "Quelle est votre situation professionnelle ?", section: "1. Profil du répondant", type: "radio" },
  Q4_autre: { label: "Autre, précisez", section: "1. Profil du répondant", type: "text", parent: "Q4" },
  Q5: { label: "Quel est votre niveau d'études ?", section: "1. Profil du répondant", type: "radio" },
  Q6: { label: "Quelle(s) langue(s) parlez-vous couramment ?", section: "1. Profil du répondant", type: "checkbox" },
  Q6_autre: { label: "Autre langue", section: "1. Profil du répondant", type: "text", parent: "Q6" },

  // Section 2 - Accès actuel aux soins de santé
  Q7: { label: "À quelle fréquence consultez-vous un médecin ou un professionnel de santé ?", section: "2. Accès actuel aux soins de santé", type: "radio" },
  Q8: { label: "Quelle est la distance approximative entre votre domicile et la structure de santé la plus proche ?", section: "2. Accès actuel aux soins de santé", type: "radio" },
  Q9: { label: "Combien de temps mettez-vous en moyenne à attendre avant d'être reçu(e) par un médecin ?", section: "2. Accès actuel aux soins de santé", type: "radio" },
  Q10: { label: "Quels sont les principaux freins qui vous empêchent de consulter un médecin ?", section: "2. Accès actuel aux soins de santé", type: "checkbox" },
  Q10_autre: { label: "Autre", section: "2. Accès actuel aux soins de santé", type: "text", parent: "Q10" },
  Q11: { label: "Combien dépensez-vous en moyenne pour une consultation médicale (hors médicaments) ?", section: "2. Accès actuel aux soins de santé", type: "radio" },
  Q12: { label: "Êtes-vous actuellement couvert(e) par une assurance santé ou une mutuelle ?", section: "2. Accès actuel aux soins de santé", type: "radio" },

  // Section 3 - Usage du mobile et du numérique
  Q13: { label: "Quel type de téléphone utilisez-vous ?", section: "3. Usage du mobile et du numérique", type: "radio" },
  Q14: { label: "Avez-vous accès à internet régulièrement ?", section: "3. Usage du mobile et du numérique", type: "radio" },
  Q15: { label: "Utilisez-vous déjà des services de paiement mobile ?", section: "3. Usage du mobile et du numérique", type: "checkbox" },
  Q16: { label: "À quelle fréquence utilisez-vous des applications mobiles ?", section: "3. Usage du mobile et du numérique", type: "radio" },
  Q17: { label: "Avez-vous déjà utilisé une application liée à la santé ?", section: "3. Usage du mobile et du numérique", type: "radio" },
  Q17_detail: { label: "Si oui, laquelle ou lesquelles ?", section: "3. Usage du mobile et du numérique", type: "text", parent: "Q17" },

  // Section 4 - Intérêt pour la téléconsultation
  Q18: { label: "Seriez-vous prêt(e) à consulter un médecin à distance via une application ?", section: "4. Intérêt pour la téléconsultation", type: "radio" },
  Q19: { label: "Pour quels types de motifs accepteriez-vous une téléconsultation ?", section: "4. Intérêt pour la téléconsultation", type: "checkbox" },
  Q20: { label: "Quel mode de téléconsultation préféreriez-vous ?", section: "4. Intérêt pour la téléconsultation", type: "radio" },
  Q21: { label: "Quel prix vous semblerait acceptable pour une téléconsultation ?", section: "4. Intérêt pour la téléconsultation", type: "radio" },
  Q22: { label: "Quelle confiance accorderiez-vous à un diagnostic posé à distance ? (1 = pas du tout, 5 = totalement)", section: "4. Intérêt pour la téléconsultation", type: "scale" },

  // Section 5 - Dossier médical numérique
  Q23: { label: "Comment conservez-vous actuellement vos documents médicaux ?", section: "5. Dossier médical numérique", type: "radio" },
  Q23_autre: { label: "Autre", section: "5. Dossier médical numérique", type: "text", parent: "Q23" },
  Q24: { label: "Souhaiteriez-vous avoir un dossier médical numérique sécurisé ?", section: "5. Dossier médical numérique", type: "radio" },
  Q25: { label: "Quelles informations aimeriez-vous partager en ligne ?", section: "5. Dossier médical numérique", type: "radio" },

  // Section 6 - Paiement
  Q26: { label: "Avez-vous un compte bancaire ou un portefeuille mobile ?", section: "6. Paiement", type: "radio" },
  Q27: { label: "Quel mode de paiement préféreriez-vous ?", section: "6. Paiement", type: "radio" },
  Q28: { label: "Accepteriez-vous un abonnement pour accéder à des services de santé ?", section: "6. Paiement", type: "radio" },

  // Section 7 - Don de sang
  Q29: { label: "Seriez-vous prêt(e) à donner votre sang ?", section: "7. Don de sang", type: "radio" },
  Q29_groupe: { label: "Quel est votre groupe sanguin ?", section: "7. Don de sang", type: "text", parent: "Q29" },
  Q30: { label: "À quelle fréquence aimeriez-vous donner votre sang ?", section: "7. Don de sang", type: "radio" },
  Q31: { label: "Quels freins vous empêcheraient de donner votre sang ?", section: "7. Don de sang", type: "checkbox" },
  Q31_autre: { label: "Autre", section: "7. Don de sang", type: "text", parent: "Q31" },
  Q32: { label: "Accepteriez-vous de participer à des campagnes de don de sang ?", section: "7. Don de sang", type: "radio" },
  Q32_detail: { label: "Détails", section: "7. Don de sang", type: "text", parent: "Q32" },
  Q33: { label: "Avez-vous déjà donné votre sang ?", section: "7. Don de sang", type: "radio" },
  Q34: { label: "Si oui, où et quand ?", section: "7. Don de sang", type: "text" },

  // Section 8 - Assistant numérique
  Q35: { label: "Utiliseriez-vous un assistant numérique (IA) pour obtenir des conseils sur votre santé ?", section: "8. Assistant numérique", type: "radio" },
  Q35_autre: { label: "Autre", section: "8. Assistant numérique", type: "text", parent: "Q35" },
  Q36: { label: "Quel type d'informations voudriez-vous ?", section: "8. Assistant numérique", type: "radio" },
  Q37: { label: "Accepteriez-vous que vos données de santé aident à former cet assistant ?", section: "8. Assistant numérique", type: "checkbox" },

  // Section 9 - Confiance et données
  Q38: { label: "Quels acteurs font-ils confiance avec vos données ?", section: "9. Confiance et données", type: "checkbox" },
  Q39: { label: "Globalement, avez-vous confiance pour que vos données de santé soient sécurisées en ligne ? (1 = pas du tout, 5 = totalement)", section: "9. Confiance et données", type: "scale" },
  Q40: { label: "Quelles mesures de sécurité vous rassureraient ?", section: "9. Confiance et données", type: "checkbox" },

  // Section 10 - Suggestions
  Q41: { label: "Avez-vous d'autres suggestions ou commentaires ?", section: "10. Suggestions", type: "text" },
  Q42: { label: "Que pourrait faire AMBOTECH pour mieux vous servir ?", section: "10. Suggestions", type: "text" },
  Q43: { label: "Avez-vous des préoccupations particulières concernant la santé numérique ?", section: "10. Suggestions", type: "text" },

  // Section 11 - Engagement
  Q44: { label: "Aimeriez-vous être contacté(e) pour tester une application pilote ?", section: "11. Engagement", type: "radio" },
  Q44_prenom: { label: "Prénom", section: "11. Engagement", type: "text", parent: "Q44" },
  Q44_telephone: { label: "Téléphone", section: "11. Engagement", type: "text", parent: "Q44" },
};

// Sections organisées
export const SECTIONS = [
  "1. Profil du répondant",
  "2. Accès actuel aux soins de santé",
  "3. Usage du mobile et du numérique",
  "4. Intérêt pour la téléconsultation",
  "5. Dossier médical numérique",
  "6. Paiement",
  "7. Don de sang",
  "8. Assistant numérique",
  "9. Confiance et données",
  "10. Suggestions",
  "11. Engagement"
];

// Helper pour formater une valeur de réponse
export function formatAnswerValue(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
  }
  if (typeof value === "number") {
    return String(value);
  }
  return value || "—";
}

// Helper pour grouper les questions par section
export function groupQuestionsBySection(response) {
  const grouped = {};
  SECTIONS.forEach((section) => {
    grouped[section] = {};
  });

  Object.entries(response).forEach(([key, value]) => {
    if (QUESTIONS_MAP[key] && value !== undefined && value !== null && value !== "") {
      const section = QUESTIONS_MAP[key].section;
      if (grouped[section]) {
        grouped[section][key] = value;
      }
    }
  });

  return grouped;
}
