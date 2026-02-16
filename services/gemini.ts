
import { GoogleGenAI } from "@google/genai";

export async function generateRaceFlavorText(): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Write a 1-sentence atmospheric welcome message for a futuristic anti-gravity racing pilot. Mention neon, speed, or the city. Keep it under 20 words.",
      config: {
        temperature: 0.9,
      }
    });

    return response.text.trim().replace(/^"|"$/g, '') || "The circuit is primed. Your pulse is the ignition. Drive.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Burn through the silicon horizon and leave the gravity-bound world behind.";
  }
}
