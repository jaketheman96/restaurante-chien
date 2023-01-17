const tablesService = require('../services/tableService');
const { statusCode } = require('../utils/statusCode');

const getTables = async (req, res) => {
  try {
    const tables = await tablesService.getTables();
    return res.status(statusCode.OK).json(tables);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
};

module.exports = { getTables };