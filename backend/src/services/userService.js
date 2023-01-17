const { Users } = require('../models')

const getUsers = async () => {
  const users = await Users.findAll({
    attributes: { exclude: ['password'] }
  });
  return users;
}

module.exports = { getUsers }