const { Sequelize, DataTypes } = require('sequelize');
const defineCanvas = require('../models/canvas');

describe.skip('Canvas model', () => {
  let sequelize, Canvas;
  beforeAll(async () => {
    sequelize = new Sequelize(process.env.TEST_DATABASE_URL, {
      dialect: 'postgres',
      logging: false
    });
    Canvas = defineCanvas(sequelize, DataTypes);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should require title', async () => {
    expect.assertions(1);
    try {
      await Canvas.create({ UserId: 1 });
    } catch (e) {
      expect(e.errors[0].message).toMatch(/Title required/);
    }
  });

  it('should require UserId', async () => {
    expect.assertions(1);
    try {
      await Canvas.create({ title: 'Test' });
    } catch (e) {
      expect(e.errors[0].message).toMatch(/UserId required/);
    }
  });

  it('should require numeric UserId', async () => {
    expect.assertions(1);
    try {
      await Canvas.create({ title: 'Test', UserId: 'abc' });
    } catch (e) {
      expect(e.errors[0].message).toMatch(/Invalid UserId/);
    }
  });
});
