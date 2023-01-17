const { Tables } = require('../models');

const getTables = async () => {
  const tables = await Tables.findAll()
  return tables;
}

module.exports = { getTables };