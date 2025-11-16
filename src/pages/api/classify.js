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
Return ONLY valid JSON. No explanation.

Example:
{"category":"Drainage","urgency":"High","department":"Water Works"}

Complaint: "${reportText}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    // Remove code block marks
    text = text.replace(/```json|```/g, "").trim();

    // Extract only JSON using regex
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI did not return JSON format.");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return res.status(200).json(parsed);

  } catch (error) {
    console.error("❌ Gemini Error:", error);
    return res.status(500).json({ error: "AI classification failed." });
  }
}
