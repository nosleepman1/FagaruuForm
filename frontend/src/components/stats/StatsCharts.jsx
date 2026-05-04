import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  Filler,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  Filler,
  Title,
  Tooltip,
  Legend
);

const colors = {
  primary: "#14b8a6",
  accent: "#f97316",
  secondary: "#8b5cf6",
  info: "#06b6d4",
  danger: "#ef4444",
  success: "#10b981",
  warning: "#eab308"
};

const palette = [
  colors.primary + "dd",
  colors.accent + "dd",
  colors.secondary + "dd",
  colors.info + "dd",
  colors.danger + "dd",
  colors.success + "dd",
  colors.warning + "dd",
  "#a855f7dd",
  "#ec4899dd",
  "#f43f5edd"
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "var(--text)",
        font: { size: 11, weight: "500" },
        padding: 12,
        boxHeight: 8,
      },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: colors.primary,
      borderWidth: 1,
      padding: 10,
      titleFont: { size: 12, weight: "bold" },
      bodyFont: { size: 11 },
      boxPadding: 6,
    },
  },
  scales: {
    x: {
      ticks: { color: "var(--text-muted)", font: { size: 10 }, maxRotation: 45, minRotation: 0 },
      grid: { color: "var(--border)", drawBorder: false },
    },
    y: {
      ticks: { color: "var(--text-muted)", font: { size: 10 } },
      grid: { color: "var(--border)", drawBorder: false },
    },
  },
};

const radarOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: { color: "var(--text)", font: { size: 11, weight: "500" }, padding: 12 },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: colors.primary,
      borderWidth: 1,
    },
  },
  scales: {
    r: {
      ticks: { color: "var(--text-muted)", font: { size: 9 }, backdropColor: "transparent" },
      grid: { color: "var(--border)" },
    },
  },
};

export default function StatsCharts({ stats }) {
  if (!stats) return null;

  // Timeline chart
  const timelineData = stats.timeline ? {
    labels: stats.timeline.map((item) => item._id),
    datasets: [
      {
        label: "Réponses reçues",
        data: stats.timeline.map((item) => item.count),
        borderColor: colors.primary,
        backgroundColor: colors.primary + "33",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.primary,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  } : null;

  // Consultation frequency (Q7) - médical relevant
  const consultationData = stats.acces?.Q7 ? {
    labels: Object.keys(stats.acces.Q7 || {}).map(k => k.substring(0, 30)),
    datasets: [{
      label: "Fréquence de consultation",
      data: Object.values(stats.acces.Q7 || {}),
      backgroundColor: palette.slice(0, Object.keys(stats.acces.Q7 || {}).length),
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Distance to healthcare (Q8)
  const distanceData = stats.acces?.Q8 ? {
    labels: Object.keys(stats.acces.Q8 || {}),
    datasets: [{
      label: "Distance structure sanitaire",
      data: Object.values(stats.acces.Q8 || {}),
      backgroundColor: [colors.success + "dd", colors.info + "dd", colors.warning + "dd", colors.danger + "dd", colors.secondary + "dd"],
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Wait time (Q9)
  const waitTimeData = stats.acces?.Q9 ? {
    labels: Object.keys(stats.acces.Q9 || {}),
    datasets: [{
      label: "Temps d'attente moyen",
      data: Object.values(stats.acces.Q9 || {}),
      backgroundColor: [colors.success + "dd", colors.info + "dd", colors.warning + "dd", colors.danger + "dd"],
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Barriers to access (Q10)
  const barriersData = stats.acces?.Q10 ? {
    labels: Object.keys(stats.acces.Q10 || {}).map(k => k.substring(0, 20)),
    datasets: [{
      label: "Freins d'accès aux soins",
      data: Object.values(stats.acces.Q10 || {}),
      backgroundColor: colors.accent + "dd",
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Medical expenses (Q11)
  const expenseData = stats.acces?.Q11 ? {
    labels: Object.keys(stats.acces.Q11 || {}),
    datasets: [{
      label: "Budget de consultation",
      data: Object.values(stats.acces.Q11 || {}),
      backgroundColor: palette.slice(0, Object.keys(stats.acces.Q11 || {}).length),
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Telehealth readiness (Q18)
  const telehealthReadinessData = stats.teleconsultation?.Q18 ? {
    labels: Object.keys(stats.teleconsultation.Q18 || {}),
    datasets: [{
      label: "Acceptabilité téléconsultation",
      data: Object.values(stats.teleconsultation.Q18 || {}),
      backgroundColor: [colors.primary + "dd", colors.secondary + "dd", colors.info + "dd", colors.warning + "dd"],
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Preferred telehealth mode (Q20)
  const modePrefData = stats.teleconsultation?.Q20 ? {
    labels: Object.keys(stats.teleconsultation.Q20 || {}),
    datasets: [{
      label: "Mode préféré",
      data: Object.values(stats.teleconsultation.Q20 || {}),
      backgroundColor: [colors.primary + "cc", colors.accent + "cc", colors.secondary + "cc", colors.info + "cc"],
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Acceptable price for telehealth (Q21)
  const priceData = stats.teleconsultation?.Q21 ? {
    labels: Object.keys(stats.teleconsultation.Q21 || {}),
    datasets: [{
      label: "Prix acceptable",
      data: Object.values(stats.teleconsultation.Q21 || {}),
      backgroundColor: palette.slice(0, Object.keys(stats.teleconsultation.Q21 || {}).length),
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Digital medical record interest (Q24)
  const medicalRecordData = stats.dossier?.Q24 ? {
    labels: Object.keys(stats.dossier.Q24 || {}),
    datasets: [{
      label: "Intérêt dossier médical numérique",
      data: Object.values(stats.dossier.Q24 || {}),
      backgroundColor: [colors.primary + "dd", colors.success + "dd", colors.warning + "dd"],
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Age distribution
  const ageData = stats.profil?.Q1 ? {
    labels: Object.keys(stats.profil.Q1 || {}),
    datasets: [{
      label: "Distribution par âge",
      data: Object.values(stats.profil.Q1 || {}),
      backgroundColor: palette.slice(0, Object.keys(stats.profil.Q1 || {}).length),
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Insurance coverage (Q12)
  const insuranceData = stats.acces?.Q12 ? {
    labels: Object.keys(stats.acces.Q12 || {}),
    datasets: [{
      label: "Couverture santé",
      data: Object.values(stats.acces.Q12 || {}),
      backgroundColor: [colors.success + "dd", colors.danger + "dd", colors.warning + "dd"],
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  // Phone type
  const phoneData = stats.numerique?.Q13 ? {
    labels: Object.keys(stats.numerique.Q13 || {}),
    datasets: [{
      label: "Type de téléphone",
      data: Object.values(stats.numerique.Q13 || {}),
      backgroundColor: [colors.primary + "dd", colors.secondary + "dd", colors.info + "dd"],
      borderColor: "#fff",
      borderWidth: 2,
    }],
  } : null;

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Timeline */}
      {timelineData && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>
            Évolution des réponses
          </h3>
          <div style={{ height: 300 }}>
            <Line data={timelineData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Top 3 Medical Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {consultationData && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 20 }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
              Fréquence consultation
            </h3>
            <div style={{ height: 240 }}>
              <Doughnut data={consultationData} options={chartOptions} />
            </div>
          </div>
        )}

        {insuranceData && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 20 }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
              Couverture santé
            </h3>
            <div style={{ height: 240 }}>
              <Doughnut data={insuranceData} options={chartOptions} />
            </div>
          </div>
        )}

        {telehealthReadinessData && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 20 }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
              Acceptabilité téléconsultation
            </h3>
            <div style={{ height: 240 }}>
              <Bar data={telehealthReadinessData} options={chartOptions} />
            </div>
          </div>
        )}

        {ageData && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 20 }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
              Distribution par âge
            </h3>
            <div style={{ height: 240 }}>
              <Doughnut data={ageData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
