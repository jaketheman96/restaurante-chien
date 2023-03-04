import { DATE, Model, INTEGER } from "sequelize";
import db from '.';
import Ibookings from "../../interfaces/Ibookings";
import Users from './user.model';
import Tables from './table.model'

class Bookings extends Model<Ibookings> {
  declare id: number;
  declare userId: number;
  declare tableId: number;
  declare reservationTime: Date;
}

Bookings.init({
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: INTEGER, allowNull: false, field: 'user_id' },
  tableId: { type: INTEGER, allowNull: false, field: 'table_id' },
  reservationTime: { type: DATE, allowNull: false },
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'bookings',
  underscored: true,
});

Users.hasMany(Bookings,
  { foreignKey: 'userId', as: 'user' });

Tables.hasMany(Bookings,
  { foreignKey: 'tableId', as: 'table' });

Bookings.belongsTo(Users,
  { foreignKey: 'user', as: 'userBooking' });

Bookings.belongsTo(Tables,
  { foreignKey: 'table', as: 'tableBooking' });


export default Bookings;