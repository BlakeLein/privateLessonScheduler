'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lessons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instructor: {
        type: Sequelize.STRING,
        references:{
          model: "Instructor",
          key: "id"
        }
      },
      student: {
        type: Sequelize.STRING,
        references:{
          model: "Student",
          key: "id"
        }
      },
      startTime: {
        type: Sequelize.STRING
      },
      stopTime: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      available: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Lessons');
  }
};