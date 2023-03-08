import { NextFunction, Request, Response } from "express";
import { Model } from "sequelize/types";
import Iorders from "../../interfaces/Iorders";
import statusCode from "../../utils/statusCode";
import OrderService from "../services/order.service";

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
    const response = await this.orderService.getOrdersById(Number(id))
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json(this.orderNotFound);
    return this._res.status(statusCode.OK).json(response)
  }

  async postOrder(): Promise<Response> {
    const { body } = this._req;
    await this.orderService.postOrder(body);
    return this._res.status(statusCode.CREATED).json({ message: 'Order created!' })
  }
}

export default OrderController