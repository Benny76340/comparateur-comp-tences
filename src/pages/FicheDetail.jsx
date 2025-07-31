import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FicheDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`
          }
        });
        setJob({ id: res.data.id, ...res.data.fields });
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
      <h1>{job.nom}</h1>
      <p><b>Code ROME :</b> {job.codeROME}</p>
      <p><b>Description :</b> {job.description}</p>

      {job.competencesTechniques && (
        <div>
          <h3>Compétences techniques</h3>
          <ul>
            {job.competencesTechniques.map((comp, index) => (
              <li key={index}>{comp}</li>
            ))}
          </ul>
        </div>
      )}

      {job.qualitesHumaines && (
        <div>
          <h3>Qualités humaines</h3>
          <ul>
            {job.qualitesHumaines.map((qualite, index) => (
              <li key={index}>{qualite}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
