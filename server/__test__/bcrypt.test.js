const { hashPass, comparePass } = require('../helpers/bcrypt');

describe('bcrypt helper', () => {
  it('should hash and compare password correctly', () => {
    const password = 'test1234';
    const hash = hashPass(password);
    expect(typeof hash).toBe('string');
    expect(hash).not.toBe(password);
    expect(comparePass(password, hash)).toBe(true);
    expect(comparePass('wrong', hash)).toBe(false);
  });
});
