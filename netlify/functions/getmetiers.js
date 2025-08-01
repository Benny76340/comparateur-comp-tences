const axios = require("axios");

exports.handler = async function (event, context) {
  console.log("➡️ Fonction getmetiers appelée");

  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Métiers`;
    console.log("🔗 URL Airtable : ", url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });

    console.log("✅ Données reçues : ", response.data);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.records),
    };
  } catch (error) {
    console.error("❌ Erreur lors de l'appel Airtable :", error.message);
    console.error("🧵 Stack : ", error.stack);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erreur lors de la récupération Airtable.",
        details: error.message,
      }),
    };
  }
};
