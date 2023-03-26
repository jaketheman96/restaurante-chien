import { STRING } from 'sequelize';
import { INTEGER, Model } from 'sequelize';
import db from '.';
import Ifoods from '../../interfaces/Ifoods';
import Orders from './orders.model';

class Foods extends Model<Ifoods> {
  declare id: number;
  declare name: string;
  declare type: string;
  declare description: string;
  declare price: string;
}

Foods.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    type: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'Foods',
    underscored: true,
  }
);

export default Foods;
