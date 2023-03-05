import { NextFunction, Request, Response } from "express";
import statusCode from "../../utils/statusCode";
import BookingService from "../services/booking.service";

class BookingController {
  private _req: Request;
  private _res: Response;
  private bookingService: BookingService;

  constructor(req: Request, res: Response, _next: NextFunction) {
    this._req = req;
    this._res = res;
    this.bookingService = new BookingService();
  }

  async getAllBookings(): Promise<Response | void> {
    const response = await this.bookingService.getAllBookings();
    return this._res.status(statusCode.OK).json(response);
  }

  async postBooking() {
    const { userId, tableId } = this._req.body
    const response = await this.bookingService.postBooking(userId, tableId);
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'Table not found!' })
    if (response === 400) return this._res.status(statusCode.BAD_REQUEST)
      .json({ message: 'Table already occupied!' })
    return this._res.status(statusCode.CREATED).json({ message: 'Booking success!' });
  }
}

export default BookingController;