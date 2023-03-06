'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      foodId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'food_id',
        references: {
          model: 'foods',
          key: 'id'
        }
      },
      saleNotes: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'sale_notes'
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');

  }
};
