'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('foods', [
      {
        name: 'Macarrão verde ao molho funghi',
        type: 'italian',
        description: 'Trazemos um molho mais cremoso e combina perfeitamente com o macarrão verde.',
        price: 35,
      },
      {
        name: 'Polenta cremosa com filé mignon',
        type: 'italian',
        description: 'Com uma carne suculenta, não há como resistir ao melhor prato do chef',
        price: 25,
      },
      {
        name: 'Macarrão ao molho Pesto',
        type: 'italian',
        description: 'Molho delicioso e imcomparável',
        price: 29,
      },
      {
        name: 'Yakissoba',
        type: 'chinese',
        description: '300g de yakissoba',
        price: 25,
      },
      {
        name: 'Lamen',
        type: 'japanese',
        description: 'O mesmo prato do naruto',
        price: 25,
      },
      {
        name: 'Risoto Funghi ou Tradicional',
        type: 'italian',
        description: 'Sabor cremoso e irresistível do molho Funghi',
        price: 30,
      },
      {
        name: 'Nhoque Funghi',
        type: 'italian',
        description: 'Molho Funghi irresistível',
        price: 35,
      },
      {
        name: 'Gyoza',
        type: 'chinese',
        description: 'Pastel chinês, recomendo provar',
        price: 30,
      },
      {
        name: 'Mapo Tofu',
        type: 'chinese',
        description: 'O tofu mais gostoso que você irá experimentar',
        price: 30,
      },
      {
        name: 'Barco de sushi 50 peças',
        type: 'japanese',
        description: 'Barco japa',
        price: 75,
      },
      {
        name: 'Missoshiro',
        type: 'japanese',
        description: 'Sopa de missô com tofu',
        price: 20,
      },
      {
        name: 'Teppan Yaki de carne',
        type: 'chinese',
        description: 'Você escolhe o ponto da carne',
        price: 40,
      },
      {
        name: 'Churrasco Japonês',
        type: 'japanese',
        description: 'Aqui é livre, pegue a sua carne no buffet e asse na sua própria mesa',
        price: 70,
      },
    ], {});

  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('foods', null, {});
  }
};
