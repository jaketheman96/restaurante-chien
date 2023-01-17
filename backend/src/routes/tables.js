const express = require('express');
const tableController = require('../controllers/tableController');

const tableRoute = express.Router();

tableRoute.get('/', tableController.getTables)
tableRoute.get('/available', tableController.getOnlyAvailableTables)
tableRoute.post('/', tableController.registerTable)

module.exports = { tableRoute }