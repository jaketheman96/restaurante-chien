import { INTEGER, Model, STRING, DATE, DECIMAL } from 'sequelize';
import db from '.';
import Iorders from '../../interfaces/Iorders';
import Users from './user.model';

class Orders extends Model<Iorders> {
  declare id: number;
  declare userId: number;
  declare deliveryAddress: string;
  declare status: string;
  declare totalPrice: number;
  declare orderNotes: string;
  declare orderDate: Date;
}

Orders.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    orderNotes: {
      type: STRING,
      allowNull: true,
      field: 'order_notes',
    },
    orderDate: {
      type: DATE,
      allowNull: false,
      field: 'order_date',
    },
    deliveryAddress: {
      type: STRING,
      allowNull: false,
      field: 'delivery_address',
    },
    status: {
      type: STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DECIMAL,
      allowNull: false,
      field: 'total_price',
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'orders',
    underscored: true,
  }
);

Orders.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

export default Orders;
