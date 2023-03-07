import { NextFunction, Request, Response } from "express";
import statusCode from "../../utils/statusCode";
import FoodService from "../services/food.service";

class FoodController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private foodService: FoodService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this.foodService = new FoodService();
  }

  async getAllFoods() {
    const response = await this.foodService.getAllFoods();
    return this._res.status(statusCode.OK).json(response);
  }
}

export default FoodController;