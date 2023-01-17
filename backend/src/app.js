const express = require('express');
const { errorHandler } = require('./middlewares/errorHandler');
const { tableRoute } = require('./routes/tables');
const { userRoute } = require('./routes/user');

const app = express();

app.use(express.json());
app.use('/users', userRoute);
app.use('/tables', tableRoute);

app.use(errorHandler);

module.exports = app;