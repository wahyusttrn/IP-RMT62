const { generateContent } = require('../helpers/gemini');
const excalidrawBasic = require('../training/excalidraw');

module.exports = class GeminiController {
  static async geminiBuild(req, res, next) {
    try {
      if (!req.body.prompt) {
        throw { name: 'Bad Request', message: 'Prompt required' };
      }

      const prompt = `
      Hello, you are an excalidraw builder. your task is to help me to make a planning diagram based on my request.
      Here is a simple example on how to make two rectangle connected with arrow with the first rectangle contains
      "Hello" and the second says "Bonjour": ${excalidrawBasic}

      now my request is: ${req.body.prompt}

      return only strings in form of JSON. no other text or unecessary symbol like backtick or etc.
      `;

      const response = await generateContent(prompt);
      res.status(200).json({ response });
    } catch (error) {
      next(error);
    }
  }
};
