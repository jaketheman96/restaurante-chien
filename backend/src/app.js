const express = require('express');
const { errorHandler } = require('./middlewares/errorHandler');
const { userRoute } = require('./routes/user');

const app = express();

app.use(express.json());
app.use('/users', userRoute)

app.use(errorHandler);

module.exports = app;