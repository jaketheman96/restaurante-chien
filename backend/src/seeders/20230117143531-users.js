'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Ademir',
        email: 'ademir2023@adm.com',
        password: '$2b$10$sVLf6JhIy/3qUlqDyIVfcetx69CYovaJRtcfVvE8bOLJ70cOvtbD2',
        role: 'admin'
      },
      {
        name: 'Fulana Pereira',
        email: 'fulana@employee.com',
        password: '$2b$10$l3H9.bhp1zhC2h2eGb5kDOWXTYfqqIKByZDv.3HcS9nH.EXG4WfIW',
        role: 'employee'
      },
      {
        name: 'Zé cliente',
        email: 'zecliente@customer.com',
        password: '$2b$10$sM5PFEcSU9GxqzWjDzTTJO6G7io1/zSDK8Tj61w/26Fq5cE4RAcMa',
        role: 'customer'
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
