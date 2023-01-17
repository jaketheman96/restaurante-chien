const tablesService = require('../services/tableService');
const { statusCode } = require('../utils/statusCode');

const getTables = async (_req, res) => {
  try {
    const tables = await tablesService.getTables();
    return res.status(statusCode.OK).json(tables);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
};

const getOnlyAvailableTables = async (_req, res) => {
  try {
    const tables = await tablesService.getOnlyAvailableTables();
    if (tables === 404) return res.status(statusCode.NOT_FOUND).json({ message: 'No tables available' })
    return res.status(statusCode.OK).json(tables)
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
};

module.exports = { getTables, getOnlyAvailableTables };