'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('bookings', [
      {
        reservation_time: new Date(),
        user_id: 1,
        table_id: 1,
      },
      {
        reservation_time: new Date(),
        user_id: 2,
        table_id: 3,
      },
      {
        reservation_time: new Date(),
        user_id: 3,
        table_id: 5,
      }
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('bookings', null, {});
  }
};
