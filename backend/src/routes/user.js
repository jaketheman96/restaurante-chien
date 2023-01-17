const express = require('express')
const userController = require('../controllers/userController');

const userRoute = express.Router();

userRoute.get('/', userController.getUsers)
userRoute.post('/', userController.loginUser)

module.exports = { userRoute }