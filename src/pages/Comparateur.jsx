import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Comparateur() {
    const [jobs, setJobs] = useState([]);
    const [currentJobId, setCurrentJobId] = useState("");
    const [targetJobId, setTargetJobId] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/jobs")
            .then(res => setJobs(res.data))
            .catch(() => console.error("Erreur lors du chargement des métiers."));
    }, []);

    const currentJob = jobs.find(j => j.id === currentJobId);
    const targetJob = jobs.find(j => j.id === targetJobId);

    const commonSkills = currentJob && targetJob
        ? currentJob.competences.filter(c => targetJob.competences.includes(c))
        : [];

    const missingSkills = currentJob && targetJob
        ? targetJob.competences.filter(c => !currentJob.competences.includes(c))
        : [];

    const acquiredSkills = commonSkills.filter(skill => selectedSkills.includes(skill));

    const handleSkillChange = (skill) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const isEmptyState = !currentJob && !targetJob;

    return (
        <div style={{ width: "100%", minHeight: "calc(100vh - 60px)", backgroundColor: "#f9fafb" }}>
            {isEmptyState ? (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(100vh - 60px)",
                    textAlign: "center",
                    padding: "20px"
                }}>
                    <h1 style={{ color: "#1a4e9e", marginBottom: "20px", fontSize: "2rem" }}>
                        Comparateur de Métiers
                    </h1>
                    <select style={{ ...selectStyle, marginBottom: "15px" }}
                        onChange={(e) => setCurrentJobId(e.target.value)}
                        value={currentJobId}
                    >
                        <option value="">-- Sélectionnez votre métier actuel --</option>
                        {jobs.map(job => (
                            <option key={job.id} value={job.id}>{job.nom}</option>
                        ))}
                    </select>
                    <select style={selectStyle}
                        onChange={(e) => setTargetJobId(e.target.value)}
                        value={targetJobId}
                    >
                        <option value="">-- Sélectionnez le métier visé --</option>
                        {jobs.map(job => (
                            <option key={job.id} value={job.id}>{job.nom}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <div style={{ padding: "20px", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
                    <h1 style={{
                        textAlign: "center",
                        color: "#1a4e9e",
                        marginBottom: "40px",
                        fontSize: "2rem"
                    }}>
                        Comparateur de Métiers
                    </h1>

                    {/* Sélecteurs */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "30px",
                        flexWrap: "wrap",
                        gap: "15px"
                    }}>
                        <select style={selectStyle} onChange={(e) => setCurrentJobId(e.target.value)} value={currentJobId}>
                            <option value="">-- Sélectionnez votre métier actuel --</option>
                            {jobs.map(job => (
                                <option key={job.id} value={job.id}>{job.nom}</option>
                            ))}
                        </select>

                        <select style={selectStyle} onChange={(e) => setTargetJobId(e.target.value)} value={targetJobId}>
                            <option value="">-- Sélectionnez le métier visé --</option>
                            {jobs.map(job => (
                                <option key={job.id} value={job.id}>{job.nom}</option>
                            ))}
                        </select>
                    </div>

                    {/* Fiches métiers */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        gap: "20px"
                    }}>
                        {currentJob && (
                            <div style={cardStyle}>
                                <h3 style={titleStyle}>{currentJob.nom}</h3>
                                <p><strong>Code ROME :</strong> {currentJob.codeROME}</p>
                                <p><strong>Description :</strong> {currentJob.description}</p>
                                <p><strong>Qualités humaines :</strong> {currentJob.qualites.join(", ")}</p>
                                <p><strong>Compétences techniques :</strong></p>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {currentJob.competences.map((skill, index) => (
                                        <li key={index} style={{ marginBottom: "8px" }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSkills.includes(skill)}
                                                    onChange={() => handleSkillChange(skill)}
                                                />{" "}
                                                {skill}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {targetJob && (
                            <div style={cardStyle}>
                                <h3 style={titleStyle}>{targetJob.nom}</h3>
                                <p><strong>Code ROME :</strong> {targetJob.codeROME}</p>
                                <p><strong>Description :</strong> {targetJob.description}</p>
                                <p><strong>Qualités humaines :</strong> {targetJob.qualites.join(", ")}</p>
                                <p><strong>Compétences techniques :</strong></p>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {targetJob.competences.map((skill, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                backgroundColor: selectedSkills.includes(skill) ? "#d9f2d9" : "transparent",
                                                padding: "6px",
                                                borderRadius: "4px",
                                                color: selectedSkills.includes(skill) ? "#155724" : "black",
                                                fontWeight: selectedSkills.includes(skill) ? "bold" : "normal"
                                            }}
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Comparaison */}
                    {currentJob && targetJob && (
                        <div style={{
                            marginTop: "40px",
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            maxWidth: "1000px",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
                                Comparaison des compétences
                            </h2>
                            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
                                <div>
                                    <h3 style={{ color: "#155724" }}>Compétences acquises</h3>
                                    <ul>
                                        {acquiredSkills.length > 0
                                            ? acquiredSkills.map((c, i) => <li key={i}>{c}</li>)
                                            : <li>Aucune compétence sélectionnée</li>}
                                    </ul>
                                </div>
                                <div>
                                    <h3 style={{ color: "#9a031e" }}>Compétences à acquérir</h3>
                                    <ul>
                                        {missingSkills.length > 0
                                            ? missingSkills.map((c, i) => <li key={i}>{c}</li>)
                                            : <li>Tu es prêt !</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ✅ Styles réutilisables
const selectStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "260px"
};

const cardStyle = {
    flex: "1 1 45%",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const titleStyle = {
    marginBottom: "10px",
    color: "#1a4e9e"
};
