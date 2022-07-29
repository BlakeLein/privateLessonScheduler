'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Lessons',
    [
      {
        instructor: 3,
        student: 3,
        date: null,
        startTime: "9:00",
        stopTime: "9:30",
        cost: 30,
        available: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instructor: 4,
        student: 4,
        date: null,
        startTime: "10:00",
        stopTime: "10:30",
        cost: 30,
        available: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instructor: 4,
        student: null,
        date: null,
        startTime: "11:00",
        stopTime: "11:30",
        cost: 30,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instructor: 3,
        student: null,
        startTime: "11:00",
        stopTime: "11:30",
        cost: 30,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {}
  );
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
