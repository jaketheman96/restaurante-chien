const express = require('express')

const tableRoute = express.Router();

tableRoute.get('/', () => console.log('tables'))

module.exports = { tableRoute }