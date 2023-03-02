const UserService = require('../services/user.service');
const { statusCode } = require('../utils/statusCode');

const getUsers = async (_req, res, _next) => {
  try {
    const users = await UserService.getUsers();
    return res.status(statusCode.OK).json(users);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const userLogin = await UserService.loginUser(req.body);
    if (userLogin === 404) return res.status(statusCode.NOT_FOUND).json({ message: 'User not Found!' })
    if (userLogin === 401) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid login!' })
    return res.status(statusCode.OK).json(userLogin)
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await UserService.registerUser(req.body);
    if (user === 401) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Email already exist' })
    return res.status(statusCode.CREATED).json(user)
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = { getUsers, loginUser, registerUser }