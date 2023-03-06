import express from 'express'
import userController from '../api/controllers/user.controller';

const userRoute = express.Router();

userRoute.get('/', (req, res, next) => new userController(req, res, next).getUsers());
userRoute.get('/:id', (req, res, next) => new userController(req, res, next).getUserById());
userRoute.post('/login', (req, res, next) => new userController(req, res, next).loginUser());
userRoute.post('/register', (req, res, next) => new userController(req, res, next).registerUser());

export default userRoute;