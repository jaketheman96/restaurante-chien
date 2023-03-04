import express from 'express';
import BookingController from '../api/controllers/booking.controller';

const bookingRoute = express.Router();

bookingRoute.get('/',
  (req, res, next) => new BookingController(req, res, next).getAllBookings(),
);

export default bookingRoute;