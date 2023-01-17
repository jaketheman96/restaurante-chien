const express = require('express');
const { errorHandler } = require('./middlewares/errorHandler');
const User = require('./routes/user');

const app = express();

app.use(express.json());
app.use('/users', User.userRoute)

app.use(errorHandler);

module.exports = app;