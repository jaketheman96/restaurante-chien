const express = require('express');
const tableController = require('../controllers/tableController');

const tableRoute = express.Router();

tableRoute.get('/', tableController.getTables)

module.exports = { tableRoute }