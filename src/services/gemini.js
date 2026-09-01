import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let client = null;

if (apiKey && apiKey !== "your_api_key_here") {
  client = new GoogleGenAI({
    apiKey: apiKey,
  });
}

export async function sendMessage(message) {
  try {
    if (!apiKey || apiKey === "your_api_key_here") {
      return "Please add your Gemini API key to .env.local file";
    }

    if (!client) {
      return "Error: Gemini client not initialized";
    }

    const response = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
    });

    // Extract text from response
    if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.candidates[0].content.parts[0].text;
    }

    return "No response received from API";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error: ${error.message}`;
  }
}