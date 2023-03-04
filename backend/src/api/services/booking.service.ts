import Bookings from "../../database/models/bookings.model";
import Tables from "../../database/models/table.model";
import Users from "../../database/models/user.model";
import Ibookings from "../../interfaces/Ibookings";

class BookingService {
  async getAllBookings(): Promise<Ibookings[]> {
    const bookings = await Bookings.findAll({
      attributes: { exclude: ['userId', 'tableId'] },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: { exclude: ['id', 'password', 'email', 'role'] }
        },
        {
          model: Tables,
          as: 'table',
          attributes: { exclude: ['available'] }
        }
      ]
    });
    return bookings;
  }
}

export default BookingService;