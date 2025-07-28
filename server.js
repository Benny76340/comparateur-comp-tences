import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const PORT = 5000;
const AIRTABLE_BASE_ID = process.env.VITE_AIRTABLE_BASE_ID;
const API_KEY = process.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const axiosInstance = axios.create({
    baseURL: AIRTABLE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
});

// ✅ Récupère tous les métiers avec relations résolues
app.get("/api/jobs", async (req, res) => {
    try {
        const jobsResponse = await axiosInstance.get("/Métiers");
        const qualitiesResponse = await axiosInstance.get("/Qualités humaines");
        const skillsResponse = await axiosInstance.get("/Compétences techniques");

        const qualitiesMap = {};
        qualitiesResponse.data.records.forEach(q => {
            qualitiesMap[q.id] = q.fields["Savoir-être"] || "Sans nom";
        });

        const skillsMap = {};
        skillsResponse.data.records.forEach(s => {
            skillsMap[s.id] = s.fields["Nom compétence"] || "Sans nom";
        });

        // ✅ Construit la liste des métiers avec noms et relations
        const jobs = jobsResponse.data.records.map(job => ({
            id: job.id,
            nom: job.fields["Nom métier"] || "Sans nom",
            codeROME: job.fields["Code ROME"] || "",
            description: job.fields["Description"] || "",
            qualites: (job.fields["Qualités humaines associées"] || []).map(id => qualitiesMap[id] || "Sans nom"),
            competences: (job.fields["Compétences techniques associées"] || []).map(id => skillsMap[id] || "Sans nom"),
        }));

        res.json(jobs);
    } catch (error) {
        console.error("Erreur API Airtable :", error.message);
        res.status(500).json({ error: "Erreur serveur proxy" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Proxy démarré sur http://localhost:${PORT}`);
});
