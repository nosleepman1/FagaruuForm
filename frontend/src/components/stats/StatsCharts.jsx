import { useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement,
  RadarController, Filler, Title, Tooltip, Legend
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement,
  RadarController, Filler, Title, Tooltip, Legend
);

const palette = [
  "#00e6a8", "#06b6d4", "#8b5cf6", "#f97316",
  "#ec4899", "#eab308", "#14b8a6", "#f43f5e",
  "#a855f7", "#10b981"
];

const glassCard = {
  background: "rgba(255,255,255,0.035)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 20,
  transition: "all 0.3s",
};

function makeChartOptions(hideScales = false) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#8899aa",
          font: { size: 11, weight: "500", family: "'Inter', sans-serif" },
          padding: 16, boxHeight: 10, boxWidth: 12, borderRadius: 3,
          usePointStyle: true, pointStyle: "rectRounded",
        },
      },
      tooltip: {
        backgroundColor: "rgba(12, 18, 32, 0.95)",
        titleColor: "#f0f4f8",
        bodyColor: "#8899aa",
        borderColor: "rgba(0,230,168,0.3)",
        borderWidth: 1,
        padding: 14,
        titleFont: { size: 13, weight: "700", family: "'Inter', sans-serif" },
        bodyFont: { size: 12, family: "'Inter', sans-serif" },
        boxPadding: 6,
        cornerRadius: 12,
        displayColors: true,
      },
    },
    scales: hideScales ? {} : {
      x: {
        ticks: { color: "#556677", font: { size: 10, family: "'Inter', sans-serif" }, maxRotation: 45, minRotation: 0 },
        grid: { color: "rgba(255,255,255,0.04)", drawBorder: false },
        border: { display: false },
      },
      y: {
        ticks: { color: "#556677", font: { size: 10, family: "'DM Mono', monospace" } },
        grid: { color: "rgba(255,255,255,0.04)", drawBorder: false },
        border: { display: false },
      },
    },
  };
}

// Section tabs for the chart dashboard
const CHART_SECTIONS = [
  { id: "timeline", label: "Évolution" },
  { id: "profil", label: "Profil" },
  { id: "acces", label: "Accès soins" },
  { id: "telehealth", label: "Téléconsultation" },
  { id: "numerique", label: "Numérique" },
];

export default function StatsCharts({ stats }) {
  const [activeSection, setActiveSection] = useState("timeline");
  if (!stats) return null;

  return (
    <div>
      {/* Section tabs */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 24, padding: 5,
        ...glassCard, borderRadius: 14, width: "fit-content",
        overflowX: "auto", maxWidth: "100%"
      }}>
        {CHART_SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            padding: "8px 18px", borderRadius: 10, border: "none",
            background: activeSection === s.id ? "rgba(0,230,168,0.12)" : "transparent",
            color: activeSection === s.id ? "#00e6a8" : "#8899aa",
            fontWeight: 600, cursor: "pointer", fontSize: 13, whiteSpace: "nowrap",
            fontFamily: "'Inter', sans-serif", transition: "all 0.2s"
          }}>{s.label}</button>
        ))}
      </div>

      {/* Timeline */}
      {activeSection === "timeline" && stats.timeline && (
        <div style={{ ...glassCard, padding: 28, animation: "fadeIn 0.4s ease-out" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 700, color: "#f0f4f8" }}>Évolution des réponses</h3>
          <div style={{ height: 320 }}>
            <Line data={{
              labels: stats.timeline.map(d => d._id),
              datasets: [{
                label: "Réponses reçues",
                data: stats.timeline.map(d => d.count),
                borderColor: "#00e6a8",
                backgroundColor: "rgba(0,230,168,0.08)",
                borderWidth: 3, fill: true, tension: 0.4,
                pointBackgroundColor: "#00e6a8",
                pointBorderColor: "rgba(12,18,32,0.9)",
                pointBorderWidth: 3, pointRadius: 5, pointHoverRadius: 8,
              }]
            }} options={makeChartOptions()} />
          </div>
        </div>
      )}

      {/* Profil */}
      {activeSection === "profil" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, animation: "fadeIn 0.4s ease-out" }}>
          <ChartBlock title="Distribution par âge" type="doughnut" data={stats.profil?.Q1} />
          <ChartBlock title="Répartition par sexe" type="doughnut" data={stats.profil?.Q2} />
          <ChartBlock title="Zone géographique" type="bar" data={stats.profil?.Q3} />
          <ChartBlock title="Situation professionnelle" type="bar" data={stats.profil?.Q4} />
          <ChartBlock title="Niveau d'études" type="doughnut" data={stats.profil?.Q5} />
          <ChartBlock title="Langues parlées" type="bar" data={stats.profil?.Q6} />
        </div>
      )}

      {/* Accès soins */}
      {activeSection === "acces" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, animation: "fadeIn 0.4s ease-out" }}>
          <ChartBlock title="Fréquence de consultation" type="doughnut" data={stats.acces?.Q7} />
          <ChartBlock title="Distance structure de santé" type="doughnut" data={stats.acces?.Q8} />
          <ChartBlock title="Temps d'attente moyen" type="bar" data={stats.acces?.Q9} />
          <ChartBlock title="Freins à la consultation" type="bar" data={stats.acces?.Q10} />
          <ChartBlock title="Coût d'une consultation" type="doughnut" data={stats.acces?.Q11} />
          <ChartBlock title="Couverture assurance" type="doughnut" data={stats.acces?.Q12} />
        </div>
      )}

      {/* Téléconsultation */}
      {activeSection === "telehealth" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, animation: "fadeIn 0.4s ease-out" }}>
          <ChartBlock title="Acceptabilité téléconsultation" type="bar" data={stats.teleconsultation?.Q18} />
          <ChartBlock title="Mode de consultation préféré" type="doughnut" data={stats.teleconsultation?.Q20} />
          <ChartBlock title="Prix acceptable" type="bar" data={stats.teleconsultation?.Q21} />
          <ChartBlock title="Intérêt dossier numérique" type="doughnut" data={stats.dossier?.Q24} />
        </div>
      )}

      {/* Numérique */}
      {activeSection === "numerique" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, animation: "fadeIn 0.4s ease-out" }}>
          <ChartBlock title="Type de téléphone" type="doughnut" data={stats.numerique?.Q13} />
          <ChartBlock title="Accès internet" type="doughnut" data={stats.numerique?.Q14} />
          <ChartBlock title="Services de paiement mobile" type="bar" data={stats.numerique?.Q15} />
          <ChartBlock title="Fréquence d'utilisation des apps" type="bar" data={stats.numerique?.Q16} />
        </div>
      )}
    </div>
  );
}

function ChartBlock({ title, type, data }) {
  if (!data) return null;
  const labels = Object.keys(data).map(k => k.length > 28 ? k.substring(0, 28) + "…" : k);
  const values = Object.values(data);
  const isDoughnut = type === "doughnut";

  const chartData = {
    labels,
    datasets: [{
      label: title,
      data: values,
      backgroundColor: isDoughnut
        ? palette.slice(0, labels.length).map(c => c + "cc")
        : palette[0] + "bb",
      borderColor: isDoughnut ? palette.slice(0, labels.length) : palette[0],
      borderWidth: isDoughnut ? 2 : 0,
      borderRadius: isDoughnut ? 0 : 8,
      hoverOffset: isDoughnut ? 8 : 0,
    }],
  };

  const ChartComp = isDoughnut ? Doughnut : Bar;

  return (
    <div style={{ ...glassCard, padding: 24 }}>
      <h3 style={{ margin: "0 0 18px", fontSize: 14, fontWeight: 700, color: "#f0f4f8", letterSpacing: "-0.2px" }}>{title}</h3>
      <div style={{ height: isDoughnut ? 260 : 240 }}>
        <ChartComp data={chartData} options={makeChartOptions(isDoughnut)} />
      </div>
    </div>
  );
}
