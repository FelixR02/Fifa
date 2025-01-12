'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>{
    return queryInterface.bulkInsert('Users', [{
      first_name: 'Juan',
      last_name: 'Perez',
      email: 'juan.perez@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
  },

  down: async (queryInterface, Sequelize) =>{
    return queryInterface.bulkDelete('Users', null, {});
  }
};
