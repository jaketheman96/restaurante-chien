'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('foods', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('foods');
  }
};
