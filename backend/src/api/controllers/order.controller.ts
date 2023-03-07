import { NextFunction, Request, Response } from "express";
import Iorders from "../../interfaces/Iorders";
import statusCode from "../../utils/statusCode";
import OrderService from "../services/order.service";

class OrderController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private orderService: OrderService

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this.orderService = new OrderService();
  }

  async getAllOrders(): Promise<Response> {
    const response = await this.orderService.getAllOrders();
    return this._res.status(statusCode.OK).json(response);
   }
}

export default OrderController