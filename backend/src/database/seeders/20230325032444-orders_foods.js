'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('orders_foods',
      [
        { food_id: 1, order_id: 1, quantity: 2 },
        { food_id: 1, order_id: 1, quantity: 2 },
        { food_id: 2, order_id: 2, quantity: 1 },
        { food_id: 3, order_id: 2, quantity: 1 },
        { food_id: 8, order_id: 3, quantity: 2 },
        { food_id: 6, order_id: 3, quantity: 3 },
      ],
      {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('orders_foods', null, {});
  }
};
