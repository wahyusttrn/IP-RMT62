const { generateContent } = require('../helpers/gemini');

describe('gemini helper', () => {
  it('should throw error if API fails', async () => {
    // Simulate error by passing invalid prompt or mocking
    await expect(generateContent(null)).rejects.toBeDefined();
  });
});
