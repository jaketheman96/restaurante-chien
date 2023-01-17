const express = require('express');
const tableController = require('../controllers/tableController');
const { tokenValidator } = require('../middlewares/tokenValidator');

const tableRoute = express.Router();

tableRoute.get('/', tokenValidator, tableController.getTables)
tableRoute.get('/available', tokenValidator, tableController.getOnlyAvailableTables)
tableRoute.post('/', tokenValidator, tableController.registerTable)

module.exports = { tableRoute }