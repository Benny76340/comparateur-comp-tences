import React, { useState } from "react";
import questionnaires from "../data/questionnaires";

export default function QuestionnaireParMetier({ nomMetier }) {
  const questions = questionnaires[nomMetier];
  const [answers, setAnswers] = useState(Array(questions?.length || 0).fill(null));
  const [submitted, setSubmitted] = useState(false);

  if (!questions) {
    return <p>Aucun questionnaire disponible pour ce métier.</p>;
  }

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const score = answers.reduce((sum, val) => sum + (val ?? 0), 0);
  const maxScore = questions.length * 4;

  const getMessage = () => {
    if (score <= maxScore * 0.4) {
      return "Ce métier te semble encore un peu éloigné… et c’est OK. Chaque parcours commence quelque part. Si ce métier t’attire malgré tout, il existe sûrement un chemin pour t’en rapprocher, à ton rythme.";
    } else if (score <= maxScore * 0.75) {
      return "Tu sembles partager certains aspects de ce métier, même si tout n’est pas encore évident. Avec un peu d’accompagnement ou de curiosité, il pourrait devenir une belle piste pour toi.";
    } else {
      return "Tu es clairement en phase avec ce métier ! Tes réponses montrent une vraie affinité. Si tu ressens de l’intérêt, tu pourrais te lancer avec confiance dans cette voie.";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Questionnaire de positionnement</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <p>{q}</p>
            <select
              required
              value={answers[index] ?? ""}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              <option value="">Choisir une réponse</option>
              <option value="1">Pas du tout à l’aise</option>
              <option value="2">Peu à l’aise</option>
              <option value="3">Assez à l’aise</option>
              <option value="4">Très à l’aise</option>
            </select>
          </div>
        ))}

        <button type="submit">Voir le résultat</button>
      </form>

      {submitted && (
        <div style={{ marginTop: "20px" }}>
          <h3>🎯 Résultat</h3>
          <p>Score total : <b>{score}</b> / {maxScore}</p>
          <p>{getMessage()}</p>
        </div>
      )}
    </div>
  );
}
