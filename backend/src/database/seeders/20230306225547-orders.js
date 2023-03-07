'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('orders', [
      {
        id: 1,
        user_id: 1,
        food_id: 1,
        order_notes: null
      },
      {
        id: 2,
        user_id: 1,
        food_id: 3,
        order_notes: 'Sem batata-palha'
      },
      {
        id: 3,
        user_id: 1,
        food_id: 2,
        order_notes: null
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
