import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method is allowed." });
  }

  const { reportText } = req.body;

  if (!reportText) {
    return res.status(400).json({ error: "Missing reportText in request." });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing Google API key." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a smart issue classifier.
Given a citizen complaint, respond **only** with a raw JSON like:
{"category":"Drainage", "urgency":"High", "department":"Water Works"}

Complaint:
"${reportText}"
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    // 🧽 Remove Markdown formatting like ```json ... ```
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();
    }

    const parsed = JSON.parse(text);
    res.status(200).json(parsed);
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message || error);
    res.status(500).json({ error: "AI classification failed." });
  }
}
