const express = require('express');
const { errorHandler } = require('./src/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.get('/users', () => console.log('alo'))

app.use(errorHandler);

module.exports = app;