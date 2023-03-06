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

  async getAllBookings(): Promise<Response> {
    const response = await this.bookingService.getAllBookings();
    return this._res.status(statusCode.OK).json(response);
  }

  async postBooking(): Promise<Response> {
    const { userId, tableId } = this._req.body
    const response = await this.bookingService.postBooking(userId, tableId);
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'Table not found!' })
    if (response === 400) return this._res.status(statusCode.BAD_REQUEST)
      .json({ message: 'Table already occupied!' })
    return this._res.status(statusCode.CREATED).json({ message: 'Booking success!' });
  }

  async getBookingById(): Promise<Response> {
    const { id } = this._req.params;
    const response = await this.bookingService.getBookingById(Number(id));
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'Booking not found' });
    return this._res.status(statusCode.OK).json(response);
  }

  async updateBooking(): Promise<Response> {
    const { params: { id }, body } = this._req;
    const response = await this.bookingService.updateBooking(Number(id), body);
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'Booking not found' });
    return this._res.status(statusCode.OK).json({ message: 'Booking changed!' });
  }

  async deleteBooking(): Promise<Response> {
    const { id } = this._req.params;
    const response = await this.bookingService.deleteBooking(Number(id));
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'Booking not found!' });
    return this._res.status(statusCode.OK).json({ message: 'Booking deleted!' })
  }
}

export default BookingController;