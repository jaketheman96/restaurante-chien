const UserService = require('../services/userService');
const { statusCode } = require('../utils/statusCode');

const getUsers = async (_req, res, _next) => {
  try {
    const users = await UserService.getUsers();
    return res.status(statusCode.OK).json(users);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
}

module.exports = { getUsers }