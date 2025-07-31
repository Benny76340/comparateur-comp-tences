import React, { useState, useEffect } from "react";
import axios from "axios";

const questions = [
  {
    text: "Dans un groupe, quel rôle jouez-vous naturellement ?",
    options: [
      { label: "J'organise et structure les actions", skill: "Organisation" },
      { label: "J'encourage et motive les autres", skill: "Inspiration" },
      { label: "Je veille à ce que chacun soit écouté", skill: "Écoute" }
    ]
  },
  {
    text: "Quand vous faites face à un imprévu, vous...",
    options: [
      { label: "Réfléchissez posément avant d'agir", skill: "Réflexion" },
      { label: "Prenez immédiatement les choses en main", skill: "Réactivité" },
      { label: "Consultez les autres pour trouver une solution", skill: "Travail en équipe" }
    ]
  },
  {
    text: "Votre façon d’aborder un nouveau projet ?",
    options: [
      { label: "J'établis un plan clair et structuré", skill: "Rigueur" },
      { label: "Je cherche à impliquer les autres dès le départ", skill: "Collaboration" },
      { label: "Je me lance et j’ajuste en chemin", skill: "Adaptabilité" }
    ]
  },
  {
    text: "Comment gérez-vous une tension dans une équipe ?",
    options: [
      { label: "Je désamorce la situation avec calme", skill: "Maîtrise de soi" },
      { label: "Je joue le médiateur entre les personnes", skill: "Empathie" },
      { label: "Je m’efface pour ne pas aggraver", skill: "Discrétion" }
    ]
  },
  {
    text: "Quelle est votre principale qualité au travail ?",
    options: [
      { label: "Fiabilité", skill: "Fiabilité" },
      { label: "Créativité", skill: "Créativité" },
      { label: "Sérieux", skill: "Sérieux" }
    ]
  },
  {
    text: "Dans une journée chargée, vous...",
    options: [
      { label: "Priorisez efficacement", skill: "Organisation" },
      { label: "Restez calme et concentré", skill: "Résilience" },
      { label: "Multitâchez facilement", skill: "Gestion du stress" }
    ]
  },
  {
    text: "Quel type de retour appréciez-vous ?",
    options: [
      { label: "Des critiques constructives", skill: "Ouverture d'esprit" },
      { label: "Des encouragements", skill: "Reconnaissance" },
      { label: "Des conseils pratiques", skill: "Esprit pratique" }
    ]
  },
  {
    text: "Vous devez convaincre quelqu’un :",
    options: [
      { label: "J'argumente logiquement", skill: "Esprit d'analyse" },
      { label: "Je crée une relation de confiance", skill: "Sociabilité" },
      { label: "Je cherche le compromis gagnant-gagnant", skill: "Négociation" }
    ]
  },
  {
    text: "Quand vous apprenez quelque chose de nouveau...",
    options: [
      { label: "Je cherche à comprendre le pourquoi", skill: "Curiosité" },
      { label: "Je pratique tout de suite", skill: "Autonomie" },
      { label: "Je demande à être guidé", skill: "Humilité" }
    ]
  },
  {
    text: "Quel est votre rapport au changement ?",
    options: [
      { label: "Je m’y adapte naturellement", skill: "Flexibilité" },
      { label: "Je l’anticipe et le prépare", skill: "Proactivité" },
      { label: "Je l’analyse avant de m’engager", skill: "Prudence" }
    ]
  }
];

export default function TestSoftSkills() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [suggestedJobs, setSuggestedJobs] = useState([]);

  const handleToggle = (qIndex, skill) => {
    setAnswers(prev => {
      const current = prev[qIndex] || [];
      const updated = current.includes(skill)
        ? current.filter(s => s !== skill)
        : current.length < 2
        ? [...current, skill]
        : current;
      return { ...prev, [qIndex]: updated };
    });
  };

  const handleSubmit = async () => {
    const flatSkills = Object.values(answers).flat();
    const counts = flatSkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {});

    const topSkills = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([skill]) => skill);

    setResults(topSkills);

    try {
      const res = await axios.get("/.netlify/functions/server/api/jobs");
      const jobs = res.data;
      const matching = jobs.filter(job =>
        job.qualites.some(q => topSkills.includes(q))
      );
      setSuggestedJobs(matching);
    } catch {
      alert("Erreur lors de la récupération des métiers");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#1a4e9e" }}>Test Soft Skills</h1>

      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p style={{ fontWeight: "bold" }}>{q.text}</p>
          {q.options.map((opt, j) => (
            <label key={j} style={{ display: "block", marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={answers[i]?.includes(opt.skill) || false}
                onChange={() => handleToggle(i, opt.skill)}
              /> {opt.label}
            </label>
          ))}
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "#1a4e9e", color: "white", border: "none", borderRadius: "5px" }}>
          Voir les métiers compatibles
        </button>
      </div>

      {results && (
        <div style={{ marginTop: "30px" }}>
          <h2>Soft Skills dominants :</h2>
          <ul>
            {results.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h2>Métiers associés :</h2>
          <ul>
            {suggestedJobs.map((job, i) => (
              <li key={i}>
                <strong>{job.nom}</strong> – <em>{job.codeROME}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
