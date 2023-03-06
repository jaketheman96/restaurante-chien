'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 1,
        food_id: 1,
        sale_notes: null
      },
      {
        id: 2,
        user_id: 1,
        food_id: 3,
        sale_notes: 'Sem batata-palha'
      },
      {
        id: 3,
        user_id: 1,
        food_id: 2,
        sale_notes: null
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
