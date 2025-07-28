import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const AIRTABLE_BASE_ID = process.env.VITE_AIRTABLE_BASE_ID;
const API_KEY = process.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const axiosInstance = axios.create({
  baseURL: AIRTABLE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function handler(event, context) {
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

    const jobs = jobsResponse.data.records.map(job => ({
      id: job.id,
      nom: job.fields["Nom métier"] || "Sans nom",
      codeROME: job.fields["Code ROME"] || "",
      description: job.fields["Description"] || "",
      qualites: (job.fields["Qualités humaines associées"] || []).map(id => qualitiesMap[id] || "Sans nom"),
      competences: (job.fields["Compétences techniques associées"] || []).map(id => skillsMap[id] || "Sans nom"),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(jobs),
    };
  } catch (error) {
    console.error("Erreur API Airtable :", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur Netlify Function" }),
    };
  }
}
