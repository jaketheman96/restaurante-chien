import Bookings from '../../database/models/BookingsModel';
import Tables from '../../database/models/TableModel';
import Users from '../../database/models/UserModel';
import Ibookings from '../../interfaces/Ibookings';
import statusCode from '../../utils/statusCode';
import TableService from './TableService';

class BookingService {
  private bookingsModel: typeof Bookings;
  private tableService: TableService;

  constructor() {
    this.bookingsModel = Bookings;
    this.tableService = new TableService();
  }

  async getAllBookings(): Promise<Ibookings[]> {
    const bookings = await this.bookingsModel.findAll({
      attributes: { exclude: ['userId', 'tableId'] },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: { exclude: ['id', 'password', 'email', 'role'] },
        },
        {
          model: Tables,
          as: 'table',
          attributes: { exclude: ['available'] },
        },
      ],
    });
    return bookings;
  }

  async postBooking(userId: number, tableId: number): Promise<number | void> {
    const newDate = new Date();
    const isTableAvailable = await this.tableService.occupyTable(tableId);
    if (isTableAvailable === 404) return statusCode.NOT_FOUND;
    if (isTableAvailable === 400) return statusCode.BAD_REQUEST;
    await this.bookingsModel.create({
      userId,
      tableId,
      reservationTime: newDate,
    });
    return;
  }

  async getBookingById(bookingId: number): Promise<number | Ibookings> {
    const booking = await this.bookingsModel.findByPk(bookingId, {
      attributes: { exclude: ['userId', 'tableId'] },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: { exclude: ['id', 'password', 'email', 'role'] },
        },
        {
          model: Tables,
          as: 'table',
          attributes: { exclude: ['available'] },
        },
      ],
    });
    if (!booking) return statusCode.NOT_FOUND;
    return booking;
  }

  async updateBooking(
    bookingId: number,
    infos: Ibookings
  ): Promise<number | void> {
    const bookingValidator = await this.getBookingById(bookingId);
    if (bookingValidator === 404) return statusCode.NOT_FOUND;
    await this.bookingsModel.update(infos, { where: { id: bookingId } });
    return;
  }

  async deleteBooking(bookingId: number): Promise<number | void> {
    const bookingValidator = await this.getBookingById(bookingId);
    if (bookingValidator === 404) return statusCode.NOT_FOUND;
    await this.bookingsModel.destroy({ where: { id: bookingId } });
    return;
  }
}

export default BookingService;
