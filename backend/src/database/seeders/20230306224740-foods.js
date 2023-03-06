'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('foods', [
      {
        id: 1,
        name: 'Arroz e carne ao molho curry',
        type: 'Indiano',
        description: 'Nosso molho curry é único e exclusivo para nossos clientes.',
        price: 'R$25,00',
      },
      {
        id: 2,
        name: 'Macarrão verde ao molho funghi',
        type: 'Italiano',
        description: 'Trazemos um molho mais cremoso e combina perfeitamente com o macarrão verde.',
        price: 'R$35,00',
      },
      {
        id: 3,
        name: 'Strogonoff de frango',
        type: 'Russo',
        description: 'Trazemos um molho mais cremoso e combina perfeitamente com o macarrão verde.',
        price: 'R$25,00',
      },
    ], {});

  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('foods', null, {});
  }
};
