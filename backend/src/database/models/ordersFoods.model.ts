import { Model } from 'sequelize/types';
import IordersFoods from '../../interfaces/IordersFoods';
import db from '.';
import { INTEGER } from 'sequelize';
import Orders from './orders.model';
import Foods from './foods.model';

class OrdersFoods extends Model<IordersFoods> {
  declare foodId: number;
  declare orderId: number;
  declare quantity: number;
}

OrdersFoods.init(
  {
    foodId: {
      type: INTEGER,
      allowNull: false,
      field: 'food_id',
    },
    orderId: {
      type: INTEGER,
      allowNull: false,
      field: 'order_id',
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'orders_foods',
    underscored: true,
  }
);

OrdersFoods.belongsToMany(Orders, {
  through: OrdersFoods,
  foreignKey: 'orderId',
  as: 'order',
});
OrdersFoods.belongsToMany(Foods, {
  through: OrdersFoods,
  foreignKey: 'orderId',
  as: 'order',
});
