import express from 'express';
import OrderController from '../api/controllers/OrderController';
import TokenValidator from '../middlewares/TokenValidator';

const orderRoute = express.Router();

orderRoute.get(
  '/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new OrderController(req, res, next).getAllOrders()
);

orderRoute.get(
  '/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new OrderController(req, res, next).getOrderById()
);

orderRoute.post(
  '/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new OrderController(req, res, next).postOrder()
);

orderRoute.put(
  '/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new OrderController(req, res, next).changeOrderStatus()
);

orderRoute.delete(
  '/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new OrderController(req, res, next).deleteOrder()
);

orderRoute.get(
  '/customer/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new OrderController(req, res, next).getOrdersByUserId()
);

export default orderRoute;
