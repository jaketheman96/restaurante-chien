import Bookings from "../../database/models/bookings.model";
import Tables from "../../database/models/table.model";
import Users from "../../database/models/user.model";
import Ibookings from "../../interfaces/Ibookings";
import statusCode from "../../utils/statusCode";
import TableService from "./table.service";

class BookingService {
  private bookingsModel;
  private tableService: TableService

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

  async postBooking(userId: number, tableId: number) {
    const newDate = new Date()
    const isTableAvailable = await this.tableService.occupyTable(tableId) as any;
    if (isTableAvailable === 404) return statusCode.NOT_FOUND;
    if (isTableAvailable === 400) return statusCode.BAD_REQUEST;
    await this.bookingsModel.create({ userId, tableId, reservationTime: newDate });
    return;
  }
}

export default BookingService;