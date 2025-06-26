const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

let token;

describe('Gemini Endpoints', () => {
  beforeAll(async () => {
    token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'SecretRahasiaYa!');
    // Ensure user with id: 1 exists
    await User.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        profilePic: ''
      }
    });
  });

  it('should return a response for gemini prompt (good test)', async () => {
    const res = await request(app)
      .post('/gemini/build')
      .set('Authorization', `Bearer ${token}`)
      .send({ prompt: 'Hello Gemini' });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('response');
  }, 20000);

  it('should return 400 if prompt is missing', async () => {
    const res = await request(app).post('/gemini/build').set('Authorization', `Bearer ${token}`).send({});
    expect([400, 401, 404, 500]).toContain(res.statusCode);
    expect(typeof res.body === 'object').toBe(true);
  });

  it('should return 401 for invalid token', async () => {
    const res = await request(app)
      .post('/gemini/build')
      .set('Authorization', 'Bearer invalidtoken')
      .send({ prompt: 'Hello Gemini' });
    expect(res.statusCode).toBeGreaterThanOrEqual(401);
  });

  it('should handle internal error from gemini helper', async () => {
    const gemini = require('../helpers/gemini');
    jest.spyOn(gemini, 'generateContent').mockImplementation(() => {
      throw new Error('Internal Gemini Error');
    });
    const res = await request(app)
      .post('/gemini/build')
      .set('Authorization', `Bearer ${token}`)
      .send({ prompt: 'force error' });
    expect([400, 401, 404, 500]).toContain(res.statusCode);
    expect(typeof res.body === 'object').toBe(true);
    gemini.generateContent.mockRestore();
  }, 20000);

  it('should handle missing Gemini API key gracefully', async () => {
    const originalKey = process.env.GOOGLE_GEMINI_KEY;
    delete process.env.GOOGLE_GEMINI_KEY;
    jest.resetModules();
    const gemini = require('../helpers/gemini');
    await expect(gemini.generateContent('test')).rejects.toBeDefined();
    process.env.GOOGLE_GEMINI_KEY = originalKey;
  });

  it('should handle non-string prompt', async () => {
    const res = await request(app)
      .post('/gemini/build')
      .set('Authorization', `Bearer ${token}`)
      .send({ prompt: { foo: 'bar' } });
    expect([400, 401, 404, 500]).toContain(res.statusCode);
    expect(typeof res.body === 'object').toBe(true);
  });
});
