import axios from "axios";

export async function handler(event, context) {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Métiers`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.records),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors de la récupération Airtable." }),
    };
  }
}
