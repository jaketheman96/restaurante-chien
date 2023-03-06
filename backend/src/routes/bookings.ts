import express from 'express';
import BookingController from '../api/controllers/booking.controller';
import TokenValidator from '../middlewares/tokenValidator';

const bookingRoute = express.Router();

bookingRoute.get('/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new BookingController(req, res, next).getAllBookings(),
);

bookingRoute.post('/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new BookingController(req, res, next).postBooking(),
);

bookingRoute.get('/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new BookingController(req, res, next).getBookingById(),
);

bookingRoute.put('/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new BookingController(req, res, next).updateBooking(),
);

bookingRoute.delete('/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new BookingController(req, res, next).deleteBooking(),
);


export default bookingRoute;