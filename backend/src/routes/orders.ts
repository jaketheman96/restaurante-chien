import express from 'express';
import OrderController from '../api/controllers/order.controller';
import TokenValidator from '../middlewares/tokenValidator';

const orderRoute = express.Router();

orderRoute.get('/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new OrderController(req, res, next).getAllOrders()
);

export default orderRoute;