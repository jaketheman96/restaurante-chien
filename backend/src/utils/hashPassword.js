const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log(hashed)
  return hashed;
};

module.exports = { hashPassword };
