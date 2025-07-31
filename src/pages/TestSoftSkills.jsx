import React, { useState, useEffect } from "react";
import axios from "axios";

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
      { label: "Priorisez efficacement", skill: "Priorisation" },
      { label: "Restez calme et concentré", skill: "Gestion du stress" },
      { label: "Multitâchez facilement", skill: "Polyvalence" }
    ]
  },
  {
    text: "Quel type de retour appréciez-vous ?",
    options: [
      { label: "Direct et constructif", skill: "Esprit critique" },
      { label: "Positif et bienveillant", skill: "Bienveillance" },
      { label: "Détaillé et argumenté", skill: "Analyse" }
    ]
  },
  {
    text: "Face à un nouvel outil numérique, vous...",
    options: [
      { label: "Explorez par vous-même", skill: "Autonomie" },
      { label: "Suivez une formation ou un tutoriel", skill: "Méthode" },
      { label: "Demandez à un collègue de vous montrer", skill: "Curiosité" }
    ]
  },
  {
    text: "Quand un collègue est en difficulté, vous...",
    options: [
      { label: "Proposez spontanément votre aide", skill: "Solidarité" },
      { label: "Analysez la situation avant d’agir", skill: "Sens de l’analyse" },
      { label: "Encouragez sans imposer", skill: "Respect" }
    ]
  },
  {
    text: "Pour apprendre efficacement, vous avez besoin...",
    options: [
      { label: "De pratiquer concrètement", skill: "Sens pratique" },
      { label: "D’un cadre clair et structuré", skill: "Méthodologie" },
      { label: "D’un objectif motivant", skill: "Motivation" }
    ]
  }
];

export default function TestSoftSkills() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [metiers, setMetiers] = useState([]);

  const handleAnswer = (questionIndex, skill) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: skill }));
  };

  const computeResults = () => {
    const count = {};
    Object.values(answers).forEach(skill => {
      count[skill] = (count[skill] || 0) + 1;
    });
    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
    const topSkills = sorted.slice(0, 2).map(([skill]) => skill);
    setResults(topSkills);
  };

  useEffect(() => {
    if (results) {
      const fetchMetiers = async () => {
        try {
          const res = await axios.get("/.netlify/functions/getQualitesHumaines");
          const data = res.data;
          const filtered = data.filter(item =>
            item.qualites.some(q => results.includes(q))
          );
          setMetiers(filtered);
        } catch (err) {
          console.error(err);
        }
      };
      fetchMetiers();
    }
  }, [results]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Testez vos compétences générales</h1>
      {!results && (
        <form onSubmit={e => { e.preventDefault(); computeResults(); }}>
          {questions.map((q, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl shadow-md mb-6">
              <p className="font-semibold mb-2">{q.text}</p>
              {q.options.map((opt, idx) => (
                <label key={idx} className="block mb-1">
                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={opt.skill}
                    onChange={() => handleAnswer(index, opt.skill)}
                    className="mr-2"
                    required
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl shadow"
          >
            Voir mes résultats
          </button>
        </form>
      )}

      {results && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Vos soft skills dominants</h2>
          <ul className="list-disc pl-6 mb-6">
            {results.map((skill, idx) => (
              <li key={idx} className="text-lg">{skill}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Métiers correspondants</h3>
          <ul className="list-disc pl-6">
            {metiers.map((m, idx) => (
              <li key={idx}>
                <a href={`/fiches-metiers#${m.nom}`} className="text-blue-700 hover:underline">
                  {m.nom}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
