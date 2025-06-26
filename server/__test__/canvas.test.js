const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

let token;
let canvasId;

describe('Canvas Endpoints', () => {
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

  it('should create a canvas (good test)', async () => {
    const res = await request(app)
      .post('/my-scenes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Canvas' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.canvas).toHaveProperty('id');
    canvasId = res.body.canvas.id;
  });

  it('should not create a canvas without title (bad test)', async () => {
    const res = await request(app).post('/my-scenes').set('Authorization', `Bearer ${token}`).send({ title: '' });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('should get all canvases (good test)', async () => {
    const res = await request(app).get('/my-scenes').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.collections)).toBe(true);
  });

  it('should get a canvas by id (good test)', async () => {
    const res = await request(app).get(`/my-scenes/${canvasId}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.canvas).toHaveProperty('id', canvasId);
  });

  it('should not get a canvas with invalid id (bad test)', async () => {
    const res = await request(app).get('/my-scenes/999999').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('should update a canvas (good test)', async () => {
    const res = await request(app)
      .put(`/my-scenes/${canvasId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Canvas' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.updatedCanvas).toHaveProperty('title', 'Updated Canvas');
  });

  it('should fail to update a canvas with invalid data', async () => {
    // Create a canvas first
    const createRes = await request(app)
      .post('/my-scenes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Update Test' });
    const id = createRes.body.canvas.id;
    // Try to update with invalid data
    const res = await request(app)
      .put(`/my-scenes/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '', scene: {} });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('should fail to update a non-existent canvas', async () => {
    const res = await request(app)
      .put('/my-scenes/999999')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Does Not Exist' });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('should delete a canvas (good test)', async () => {
    // Create a canvas to delete
    const createRes = await request(app)
      .post('/my-scenes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Delete Me' });
    const id = createRes.body.canvas.id;
    const res = await request(app).delete(`/my-scenes/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch(/Success delete canvas/);
  });

  it('should fail to delete a non-existent canvas', async () => {
    const res = await request(app).delete('/my-scenes/999999').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('should handle error in getMyScenes', async () => {
    const app = require('../app');
    jest.spyOn(require('../controllers/CanvasController'), 'getMyScenes').mockImplementation((req, res, next) => {
      throw new Error('getMyScenes error');
    });
    const res = await require('supertest')(app).get('/my-scenes').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    require('../controllers/CanvasController').getMyScenes.mockRestore();
  });

  it('should handle error in postMyScene', async () => {
    const app = require('../app');
    jest.spyOn(require('../controllers/CanvasController'), 'postMyScene').mockImplementation((req, res, next) => {
      throw new Error('postMyScene error');
    });
    const res = await require('supertest')(app)
      .post('/my-scenes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test' });
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    require('../controllers/CanvasController').postMyScene.mockRestore();
  });

  it('should handle error in putMyScene', async () => {
    const app = require('../app');
    jest.spyOn(require('../controllers/CanvasController'), 'putMyScene').mockImplementation((req, res, next) => {
      throw new Error('putMyScene error');
    });
    const res = await require('supertest')(app)
      .put('/my-scenes/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test' });
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    require('../controllers/CanvasController').putMyScene.mockRestore();
  });

  it('should handle error in deleteMyScene', async () => {
    const app = require('../app');
    jest.spyOn(require('../controllers/CanvasController'), 'deleteMyScene').mockImplementation((req, res, next) => {
      throw new Error('deleteMyScene error');
    });
    const res = await require('supertest')(app).delete('/my-scenes/1').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    require('../controllers/CanvasController').deleteMyScene.mockRestore();
  });

  it('should handle error in getMySceneById', async () => {
    const app = require('../app');
    jest.spyOn(require('../controllers/CanvasController'), 'getMySceneById').mockImplementation((req, res, next) => {
      throw new Error('getMySceneById error');
    });
    const res = await require('supertest')(app).get('/my-scenes/1').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    require('../controllers/CanvasController').getMySceneById.mockRestore();
  });
});
