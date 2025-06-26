const { Sequelize, DataTypes } = require('sequelize');
const defineUser = require('../models/user');
const path = require('path');

describe.skip('User model', () => {
  let sequelize, User;
  beforeAll(async () => {
    sequelize = new Sequelize(process.env.TEST_DATABASE_URL, {
      dialect: 'postgres',
      logging: false
    });
    User = defineUser(sequelize, DataTypes);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should require name', async () => {
    expect.assertions(1);
    try {
      await User.create({ email: 'a@a.com', password: '123456' });
    } catch (e) {
      expect(e.errors[0].message).toMatch(/Name required/);
    }
  });

  it('should require email', async () => {
    expect.assertions(1);
    try {
      await User.create({ name: 'Test', password: '123456' });
    } catch (e) {
      expect(e.errors[0].message).toMatch(/Email required/);
    }
  });

  it('should require valid email', async () => {
    expect.assertions(1);
    try {
      await User.create({ name: 'Test', email: 'notanemail', password: '123456' });
    } catch (e) {
      expect(e.errors[0].message).toMatch(/Invalid email format/);
    }
  });
});

describe('models/index.js edge cases', () => {
  it('should use env variable if config.use_env_variable is set', () => {
    jest.resetModules();
    process.env.TEST_DB_URL = 'postgres://user:pass@localhost:5432/db';
    const config = {
      use_env_variable: 'TEST_DB_URL',
      database: 'db',
      username: 'user',
      password: 'pass',
      host: 'localhost',
      dialect: 'postgres'
    };
    jest.doMock('../config/config.json', () => ({ test: config }), { virtual: true });
    const Sequelize = require('sequelize');
    jest.spyOn(Sequelize.prototype, 'authenticate').mockResolvedValue();
    require('../models/index');
    Sequelize.prototype.authenticate.mockRestore();
  });

  it('should not fail if model has no associate method', () => {
    jest.resetModules();
    const fakeModel = { name: 'Fake', associate: undefined };
    jest.doMock('../models/fake', () => () => fakeModel, { virtual: true });
    require('../models/index');
  });
});

describe('models/index.js extra edge cases', () => {
  it('should handle invalid env variable for use_env_variable', () => {
    jest.resetModules();
    process.env.TEST_DB_URL = undefined;
    const config = {
      use_env_variable: 'TEST_DB_URL',
      database: 'db',
      username: 'user',
      password: 'pass',
      host: 'localhost',
      dialect: 'postgres'
    };
    jest.doMock('../config/config.json', () => ({ test: config }), { virtual: true });
    const Sequelize = require('sequelize');
    jest.spyOn(Sequelize.prototype, 'authenticate').mockResolvedValue();
    expect(() => require('../models/index')).toThrow();
    Sequelize.prototype.authenticate.mockRestore();
  });

  it('should handle error thrown in associate method', () => {
    jest.resetModules();
    const fakeModel = {
      name: 'Fake',
      associate: () => {
        throw new Error('Associate error');
      }
    };
    jest.doMock('../models/fake', () => () => fakeModel, { virtual: true });
    expect(() => require('../models/index')).toThrow('Associate error');
  });
});

describe('User model extra', () => {
  let sequelize, User;
  beforeAll(async () => {
    const { Sequelize, DataTypes } = require('sequelize');
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    User = require('../models/user')(sequelize, DataTypes);
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it('should set default tier to Free', async () => {
    const user = await User.create({
      name: 'Tier User',
      email: 'tieruser@example.com',
      password: 'password123',
      profilePic: ''
    });
    expect(user.tier).toBe('Free');
  });

  it('should hash password before create', async () => {
    const user = await User.create({
      name: 'Hash User',
      email: 'hashuser@example.com',
      password: 'password123',
      profilePic: ''
    });
    expect(user.password).not.toBe('password123');
    expect(user.password.length).toBeGreaterThan(10);
  });
});
