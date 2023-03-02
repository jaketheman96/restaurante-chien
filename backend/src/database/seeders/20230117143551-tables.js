'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('tables', [
      {
        available: true,
        seats: 5,
      },
      {
        available: true,
        seats: 4,
      },
      {
        available: true,
        seats: 3,
      },
      {
        available: true,
        seats: 2,
      },
      {
        available: true,
        seats: 5,
      },
      {
        available: false,
        seats: 2,
      },
      {
        available: false,
        seats: 4,
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('tables', null, {})
  }
};
