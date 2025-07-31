import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const questions = [
  {
    text: "Dans un groupe, quel rôle jouez-vous naturellement ?",
    options: [
      { label: "J’organise et structure les actions", skill: "Organisation" },
      { label: "J’encourage et motive les autres", skill: "Inspiration" },
      { label: "Je veille à ce que chacun soit écouté", skill: "Écoute" }
    ]
  },
  {
    text: "Quand vous faites face à un imprévu, vous...",
    options: [
      { label: "Réfléchissez posément avant d’agir", skill: "Réflexion" },
      { label: "Prenez immédiatement les choses en main", skill: "Réactivité" },
      { label: "Consultez les autres pour trouver une solution", skill: "Travail en équipe" }
    ]
  },
  {
    text: "Votre façon d’aborder un nouveau projet ?",
    options: [
      { label: "J’établis un plan clair et structuré", skill: "Rigueur" },
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
      { label: "Restez calme et concentré", skill: "Maîtrise de soi" },
      { label: "Multitâchez facilement", skill: "Adaptabilité" }
    ]
  },
  {
    text: "Quel type de retour appréciez-vous ?",
    options: [
      { label: "Constructif et direct", skill: "Sincérité" },
      { label: "Bienveillant et encourageant", skill: "Empathie" },
      { label: "Factuel et argumenté", skill: "Rigueur" }
    ]
  },
  {
    text: "Comment abordez-vous une nouveauté ?",
    options: [
      { label: "Avec enthousiasme", skill: "Curiosité" },
      { label: "Avec prudence", skill: "Réflexion" },
      { label: "Avec méthode", skill: "Organisation" }
    ]
  },
  {
    text: "Si un collègue est en difficulté, vous...",
    options: [
      { label: "L’écoutez attentivement", skill: "Écoute" },
      { label: "L’aidez à relativiser", skill: "Optimisme" },
      { label: "Lui proposez une solution concrète", skill: "Réactivité" }
    ]
  },
  {
    text: "Vous vous sentez le plus utile quand...",
    options: [
      { label: "Vous motivez une équipe", skill: "Inspiration" },
      { label: "Vous résolvez un problème", skill: "Esprit d’analyse" },
      { label: "Vous aidez un collègue à progresser", skill: "Transmission" }
    ]
  }
];

export default function TestSoftSkills() {
  const [answers, setAnswers] = useState({});
  const [topSkills, setTopSkills] = useState([]);

  const handleChange = (qIndex, skill) => {
    setAnswers({ ...answers, [qIndex]: skill });
  };

  useEffect(() => {
    const counts = {};
    Object.values(answers).forEach(skill => {
      counts[skill] = (counts[skill] || 0) + 1;
    });
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([skill]) => skill);
    setTopSkills(sorted);
  }, [answers]);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#1a4e9e", textAlign: "center", marginBottom: "30px" }}>
        Testez vos compétences générales
      </h1>
      {questions.map((q, index) => (
        <div
          key={index}
          style={{
            marginBottom: "30px",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>{q.text}</h3>
          {q.options.map((opt, i) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={opt.skill}
                  checked={answers[index] === opt.skill}
                  onChange={() => handleChange(index, opt.skill)}
                  style={{ marginRight: "8px" }}
                />
                {opt.label}
              </label>
            </div>
          ))}
        </div>
      ))}

      {topSkills.length > 0 && (
        <div style={{
          marginTop: "40px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#e3f2fd",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#1a4e9e" }}>Top Soft Skills identifiés :</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {topSkills.map((skill, i) => (
              <li key={i} style={{ fontSize: "18px", margin: "10px 0" }}>✅ {skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
