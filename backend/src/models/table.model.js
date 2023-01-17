module.exports = (sequelize, DataTypes) => {
  const Tables = sequelize.define('Tables', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    available: DataTypes.BOOLEAN,
    seats: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'tables',
    underscored: true,
  });

  Tables.associate = (models) => {
    Tables.hasMany(models.Bookings,
           { foreignKey: 'tableId', as: 'tables' });
       };

  return Tables;
};