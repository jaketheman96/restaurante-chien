import { DATE, Model, INTEGER } from "sequelize";
import db from '.';
import Ibookings from "../../interfaces/Ibookings";
import Users from './UserModel';
import Tables from './TableModel'

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
  modelName: 'Bookings',
  underscored: true,
});

Bookings.belongsTo(Tables,
  { foreignKey: 'tableId', as: 'table' });


export default Bookings;