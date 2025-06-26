const { guardOwnerOnly } = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const { User } = require('../models');

describe('authorization middleware', () => {
  it('should call next if user is owner', async () => {
    const req = { user: { id: 1 }, params: { id: 1 } };
    const res = {};
    const next = jest.fn();
    // Mock Canvas.findByPk
    const Canvas = require('../models').Canvas;
    Canvas.findByPk = jest.fn().mockResolvedValue({ UserId: 1 });
    await guardOwnerOnly(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('should throw Not Found if canvas not found', async () => {
    const req = { user: { id: 1 }, params: { id: 999 } };
    const res = {};
    const next = jest.fn();
    const Canvas = require('../models').Canvas;
    Canvas.findByPk = jest.fn().mockResolvedValue(null);
    await guardOwnerOnly(req, res, next);
    expect(next.mock.calls[0][0]).toHaveProperty('name', 'Not Found');
  });

  it('should throw Forbidden if user is not owner', async () => {
    const req = { user: { id: 2 }, params: { id: 1 } };
    const res = {};
    const next = jest.fn();
    const Canvas = require('../models').Canvas;
    Canvas.findByPk = jest.fn().mockResolvedValue({ UserId: 1 });
    await guardOwnerOnly(req, res, next);
    expect(next.mock.calls[0][0]).toHaveProperty('name', 'Forbidden');
  });
});

describe('authentication middleware', () => {
  it('should throw Unauthorized if no Authorization header', async () => {
    const req = { headers: {} };
    const res = {};
    const next = jest.fn();
    await authentication(req, res, next);
    expect(next.mock.calls[0][0]).toHaveProperty('name', 'Unauthorized');
  });

  it('should throw Unauthorized if user not found', async () => {
    const token = require('../helpers/jwt').signToken({ id: 99999 });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();
    // Mock User.findByPk to return null
    jest.spyOn(User, 'findByPk').mockResolvedValue(null);
    await authentication(req, res, next);
    expect(next.mock.calls[0][0]).toHaveProperty('name', 'Unauthorized');
    User.findByPk.mockRestore();
  });
});
