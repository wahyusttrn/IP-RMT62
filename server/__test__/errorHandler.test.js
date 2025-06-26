const errorHandler = require('../middlewares/errorHandler');

describe('errorHandler middleware', () => {
  let res, next;
  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should handle SequelizeValidationError', () => {
    const err = { name: 'SequelizeValidationError', errors: [{ message: 'Validation failed' }] };
    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Validation failed' });
  });

  it('should handle Bad Request', () => {
    const err = { name: 'Bad Request', message: 'Bad input' };
    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Bad input' });
  });

  it('should handle Unauthorized', () => {
    const err = { name: 'Unauthorized', message: 'No token' };
    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token' });
  });

  it('should handle JsonWebTokenError', () => {
    const err = { name: 'JsonWebTokenError' };
    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Token' });
  });

  it('should handle Forbidden', () => {
    const err = { name: 'Forbidden' };
    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden Access' });
  });

  it('should handle Not Found', () => {
    const err = { name: 'Not Found', message: 'Not found' };
    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
  });

  it('should handle default error', () => {
    const err = { name: 'OtherError' };
    errorHandler(err, {}, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
