import { INTEGER, Model, STRING } from "sequelize";
import db from '.';
import Isales from "../../interfaces/Isales";
import Foods from "./foods.model";
import Users from "./user.model";

class Sales extends Model<Isales> {
  declare id: number;
  declare userId: number;
  declare foodId: number;
  declare saleNotes: string;
}

Sales.init({
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

Users.hasMany(Sales, { foreignKey: 'userId', as: 'userSale' });
Foods.hasMany(Sales, { foreignKey: 'foodId', as: 'foodSale' });

Sales.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Sales.belongsTo(Foods, { foreignKey: 'foodId', as: 'food' });

export default Sales;