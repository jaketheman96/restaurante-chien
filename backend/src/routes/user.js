const express = require('express')
const userController = require('../controllers/userController');

const userRoute = express.Router();

userRoute.get('/', userController.getUsers)
userRoute.post('/login', userController.loginUser)
userRoute.post('/register', userController.registerUser)

module.exports = { userRoute }