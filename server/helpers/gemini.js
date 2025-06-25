const { GoogleGenAI, Type } = require('@google/genai');

const GOOGLE_GEMINI_KEY = process.env.GOOGLE_GEMINI_KEY;

const ai = new GoogleGenAI({ apiKey: GOOGLE_GEMINI_KEY });

const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT
        }
      }
    });
    return response.text;
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  generateContent
};

// async function main() {
//   const response = await ai.models.generateContent({
//     model: 'gemini-2.5-flash',
//     contents: 'Explain how AI works in a few words'
//   });
// }
