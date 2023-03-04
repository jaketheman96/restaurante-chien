import { NextFunction, Request, Response } from "express";
import statusCode from "../../utils/statusCode";
import BookingService from "../services/booking.service";

class BookingController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private bookingService: BookingService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this.bookingService = new BookingService();
  }

  async getAllBookings(): Promise<Response | void> {
    try {
      const response = await this.bookingService.getAllBookings();
      return this._res.status(statusCode.OK).json(response);
    } catch (error) {
      this._next(error);
    }
  }
}

export default BookingController;