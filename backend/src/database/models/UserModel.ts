import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';
import Iusers from '../../interfaces/Iusers';
import Bookings from './BookingsModel';

class Users extends Model<Iusers> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

Users.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false },
    password: { type: STRING, allowNull: false },
    role: { type: STRING, allowNull: false },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'Users',
    underscored: true,
  }
);

Users.hasMany(Bookings, { foreignKey: 'userId', as: 'bookings' });

Bookings.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

export default Users;
