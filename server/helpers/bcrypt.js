const bcrypt = require('bcryptjs');

const hashPass = (password) => {
  return bcrypt.hashSync(password, 100);
};

const comparePass = (input, hash) => {
  return bcrypt.compareSync(input, hash);
};

module.exports = {
  hashPass,
  comparePass
};
