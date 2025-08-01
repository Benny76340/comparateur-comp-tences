import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FichesMetiers() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log("📡 Appel à la fonction Netlify getmetiers...");

      try {
        const res = await axios.get("/.netlify/functions/getmetiers");
        console.log("✅ Données reçues :", res.data);

        setJobs(res.data.map(record => ({
          id: record.id,
          ...record.fields
        })));
      } catch (error) {
        console.error("❌ Erreur lors du chargement des métiers :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((j) =>
    j.nom && j.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fiches Métiers</h1>
      <input
        type="text"
        placeholder="Rechercher un métier..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />
      {loading ? (
        <p>Chargement des métiers...</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "15px"
        }}>
          {filteredJobs.map((job) => (
            <div key={job.id} style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px"
            }}>
              <h3>{job.nom}</h3>
              <p><b>Code ROME :</b> {job.codeROME}</p>
              <p>{job.description}</p>
              <Link to={`/fiche/${job.id}`}>Voir la fiche complète</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
