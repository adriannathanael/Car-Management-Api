'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      name: "superadmin1",
      email:"superadmin1@gmail.com" ,
      password: bcrypt.hashSync("superadmin1", 10),
      type: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date()
   }], {});    
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
