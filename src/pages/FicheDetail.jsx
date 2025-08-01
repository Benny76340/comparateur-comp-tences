import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionnaireParMetier from "../components/QuestionnaireParMetier";

export default function FicheDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get("/.netlify/functions/getmetiers");
        const record = res.data.find((r) => r.id === id);
        setJob(record?.fields || null);
      } catch (error) {
        console.error("Erreur lors du chargement de la fiche métier :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p>Chargement de la fiche métier...</p>;
  if (!job) return <p>Métier introuvable.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{job["Nom métier"]}</h1>
      <p><b>Code ROME :</b> {job["Code ROME"]}</p>
      <p><b>Description :</b> {job["Description"]}</p>

      {job["Compétences techniques"] && (
        <div>
          <h3>Compétences techniques</h3>
          <ul>
            {job["Compétences techniques"].map((comp, index) => (
              <li key={index}>{comp}</li>
            ))}
          </ul>
        </div>
      )}

      {job["Qualités humaines"] && (
        <div>
          <h3>Qualités humaines</h3>
          <ul>
            {job["Qualités humaines"].map((qualite, index) => (
              <li key={index}>{qualite}</li>
            ))}
          </ul>
        </div>
      )}

      <hr style={{ margin: "30px 0" }} />
      <QuestionnaireParMetier nomMetier={job["Nom métier"]} />
    </div>
  );
}
