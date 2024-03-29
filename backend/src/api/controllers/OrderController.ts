import { NextFunction, Request, Response } from 'express';
import statusCode from '../../utils/statusCode';
import OrderService from '../services/OrderService';

class OrderController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private orderService: OrderService;
  private orderNotFound: Object;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this.orderService = new OrderService();
    this.orderNotFound = { message: 'No such order with this id!' };
  }

  async getAllOrders(): Promise<Response> {
    const response = await this.orderService.getAllOrders();
    return this._res.status(statusCode.OK).json(response);
  }

  async getOrderById(): Promise<Response> {
    const { id } = this._req.params;
    const response = await this.orderService.getOrdersById(Number(id));
    if (response === 404)
      return this._res.status(statusCode.NOT_FOUND).json(this.orderNotFound);
    return this._res.status(statusCode.OK).json(response);
  }

  async postOrder(): Promise<Response> {
    const { body } = this._req;
    await this.orderService.postOrder(body);
    return this._res
      .status(statusCode.CREATED)
      .json({ message: 'Order created!' });
  }

  async changeOrderStatus(): Promise<Response> {
    const {
      params: { id },
      body,
    } = this._req;
    const response = await this.orderService.changeOrderStatus(Number(id), body.status);
    if (response === 404)
      return this._res.status(statusCode.NOT_FOUND).json(this.orderNotFound);
    return this._res.status(statusCode.OK).json({ message: 'Order status updated!' });
  }

  async deleteOrder(): Promise<Response> {
    const { id } = this._req.params;
    const response = await this.orderService.deleteOrder(Number(id));
    if (response === 404)
      return this._res.status(statusCode.NOT_FOUND).json(this.orderNotFound);
    return this._res.status(statusCode.OK).json({ message: 'Order deleted!' });
  }

  async getOrdersByUserId(): Promise<Response> {
    const { id } = this._req.params;
    const response = await this.orderService.getOrdersByUserId(Number(id));
    return this._res.status(statusCode.OK).json(response);
  }
}

export default OrderController;
