import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/paraphrase", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const prompt = `
You are a professional paraphrasing tool like QuillBot.

Rewrite the text in ${mode} mode.

Rules:
- Keep the original meaning
- Change sentence structure
- Use natural English
- Improve clarity and grammar
- Do not add false information
- Return only the paraphrased text

Text:
${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gemini paraphrasing failed" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});