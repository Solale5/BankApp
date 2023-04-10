'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      iduser: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      security_question: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.NUMBER
      },
      email: {
        type: Sequelize.STRING
      },
      recovEmail: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.NUMBER
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};