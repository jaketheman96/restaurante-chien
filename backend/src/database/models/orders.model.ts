import { INTEGER, Model, STRING } from "sequelize";
import db from '.';
import Iorders from "../../interfaces/Iorders";
import Foods from "./foods.model";
import Users from "./user.model";

class Orders extends Model<Iorders> {
  declare id: number;
  declare userId: number;
  declare foodId: number;
  declare saleNotes: string;
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
  saleNotes: {
    type: STRING,
    allowNull: true,
    field: 'sale_notes',
  },
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'sales',
  underscored: true,
})

Users.hasMany(Orders, { foreignKey: 'userId', as: 'userSale' });
Foods.hasMany(Orders, { foreignKey: 'foodId', as: 'foodSale' });

Orders.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Orders.belongsTo(Foods, { foreignKey: 'foodId', as: 'food' });

export default Orders;