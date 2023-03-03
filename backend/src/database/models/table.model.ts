import { INTEGER, BOOLEAN, Model } from "sequelize";
import db from '.'
import Itable from "../../interfaces/Itables";

class Tables extends Model<Itable> {
  declare id: number;
  declare available: boolean;
  declare seats: number;
}

Tables.init({
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  available: BOOLEAN,
  seats: INTEGER,
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'Tables',
  underscored: true,
});

export default Tables;
