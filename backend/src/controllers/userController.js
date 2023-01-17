const UserService = require('../services/userService');

const getUsers = async (_req, res, _next) => {
  try {
    const users = await UserService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = { getUsers }