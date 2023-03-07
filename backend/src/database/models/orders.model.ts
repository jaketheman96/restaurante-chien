import { INTEGER, Model, STRING, DATE } from "sequelize";
import db from '.';
import Iorders from "../../interfaces/Iorders";
import Foods from "./foods.model";
import Users from "./user.model";

class Orders extends Model<Iorders> {
  declare id: number;
  declare userId: number;
  declare foodId: number;
  declare orderNotes: string;
  declare orderDate: Date;
}

Orders.init({
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
  foodId: {
    type: INTEGER,
    allowNull: false,
    field: 'food_id',
  },
  orderNotes: {
    type: STRING,
    allowNull: true,
    field: 'order_notes',
  },
  orderDate: {
    type: DATE,
    allowNull: false,
    field: 'order_date'
  },
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'orders',
  underscored: true,
})

Orders.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Orders.belongsTo(Foods, { foreignKey: 'foodId', as: 'food' });

export default Orders;