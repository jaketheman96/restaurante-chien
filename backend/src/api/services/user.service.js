const { Users } = require('../../database/models');
const { statusCode } = require('../../utils/statusCode');
const { comparePassword, hashPassword } = require('../../utils/hashPassword');
const { generateToken } = require('../../utils/tokenHelper');

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
  const token = generateToken({ user });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
}

const registerUser = async ({ name, email, password, role }) => {
  const checkUser = await Users.findOne({ where: { email } })
  if (checkUser) return statusCode.UNAUTHORIZED;
  const hashedPassword = await hashPassword(password);
  const user = await Users.create({ name, email, password: hashedPassword, role })
  const token = generateToken({ user });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  }
}

module.exports = { getUsers, loginUser, registerUser }