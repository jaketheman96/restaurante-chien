const { Tables } = require('../models');
const { statusCode } = require('../utils/statusCode');

const getTables = async () => {
  const tables = await Tables.findAll()
  return tables;
}

const getOnlyAvailableTables = async () => {
  const tables = await Tables.findAll({
    where: { available: true },
  });
  if (!tables) return statusCode.NOT_FOUND;
  return tables;
}

const registerTables = async ({ available, seats }) => {
  await Tables.create({ available, seats });
  return { message: 'Table registered!' };
}

module.exports = { getTables, getOnlyAvailableTables, registerTables };