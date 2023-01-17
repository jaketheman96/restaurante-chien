'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reservationTime: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'reservation_time',
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      tableId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'table_id',
        references: {
          model: 'tables',
          key: 'id',
        }
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('bookings');
  }
};
