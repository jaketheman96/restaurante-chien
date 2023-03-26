import { INTEGER, Model } from 'sequelize';
import IordersFoods from '../../interfaces/IordersFoods';
import db from '.';
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
      references: {
        model: 'foods',
        key: 'id',
      },
    },
    orderId: {
      type: INTEGER,
      allowNull: false,
      field: 'order_id',
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'ordersFoods',
    underscored: true,
  }
);

OrdersFoods.belongsTo(Foods, { foreignKey: 'foodId', as: 'foods' });

export default OrdersFoods;
