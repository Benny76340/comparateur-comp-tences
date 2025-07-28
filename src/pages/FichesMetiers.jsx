import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FichesMetiers() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs").then((res) => setJobs(res.data));
  }, []);

  const filteredJobs = jobs.filter((j) =>
    j.nom.toLowerCase().includes(search.toLowerCase())
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px" }}>
        {filteredJobs.map((job) => (
          <div key={job.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <h3>{job.nom}</h3>
            <p><b>Code ROME :</b> {job.codeROME}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
