const { Users } = require('../models');
const { statusCode } = require('../utils/statusCode');
const { comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../utils/tokenHelper');

const getUsers = async () => {
  const users = await Users.findAll({
    attributes: { exclude: ['password'] },
  })
  return users;
}

const loginUser = async ({ email, password }) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) return statusCode.NOT_FOUND;
  const comparingPassword = await comparePassword(password, user.password)
  if (!comparingPassword) return statusCode.UNAUTHORIZED;
  const token = await generateToken({ user });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
}

module.exports = { getUsers, loginUser }