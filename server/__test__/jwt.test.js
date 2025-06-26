const { signToken, verifyToken } = require('../helpers/jwt');

describe('jwt helper', () => {
  it('should sign and verify token correctly', () => {
    const payload = { id: 1, name: 'Test' };
    const token = signToken(payload);
    expect(typeof token).toBe('string');
    const decoded = verifyToken(token);
    expect(decoded.id).toBe(1);
    expect(decoded.name).toBe('Test');
  });

  it('should throw error for invalid token', () => {
    expect(() => verifyToken('invalid.token')).toThrow();
  });
});
