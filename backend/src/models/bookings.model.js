module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER,
    reservationTime: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: 'bookings',
    underscored: true,
  });

  Bookings.associate = (models) => {
    Bookings.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'users' });
  };

  Bookings.associate = (models) => {
    Bookings.belongsTo(models.Tables,
      { foreignKey: 'tableId', as: 'tables' });
  };


  return Bookings;
};