import express from 'express'
import userController from '../api/controllers/UserController';

const userRoute = express.Router();

userRoute.get('/', (req, res, next) => new userController(req, res, next).getUsers());
userRoute.get('/:id', (req, res, next) => new userController(req, res, next).getUserById());
userRoute.put('/:id', (req, res, next) => new userController(req, res, next).updateUser());
userRoute.delete('/:id', (req, res, next) => new userController(req, res, next).deleteUser());
userRoute.post('/login', (req, res, next) => new userController(req, res, next).loginUser());
userRoute.post('/register', (req, res, next) => new userController(req, res, next).registerUser());

export default userRoute;