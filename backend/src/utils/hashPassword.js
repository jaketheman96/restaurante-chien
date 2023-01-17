const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

const comparePassword = async (userPassword, hashedPassword) => {
  const comparing = await bcrypt.compare(userPassword, hashedPassword);
  return comparing;
}

module.exports = { hashPassword, comparePassword };
