'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('orders', [
      {
        user_id: 1,
        delivery_address: 'Rua admin 32',
        total_price: 50,
        status: 'Pendente',
        order_date: new Date(),
        order_notes: 'Teste'
      },
      {
        user_id: 1,
        delivery_address: 'Rua admin 90',
        total_price: 60,
        status: 'Pendente',
        order_date: new Date(),
        order_notes: 'Teste 2'
      },
      {
        user_id: 1,
        delivery_address: 'Rua admin 50',
        total_price: 50,
        status: 'Pendente',
        order_date: new Date(),
        order_notes: 'Teste 3'
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
