"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Instructors",
      [
        {
          firstName: "Blake",
          lastName: "Lein",
          email: "blk&cookies@hotmail.com",
          password: "123123",
          instrument: "MegaTuba",
          students: null,
          lesson: "5:15",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Ethan",
          lastName: "Gula",
          email: "ethang@hotmail.com",
          password: "123123",
          instrument: "Clarihorn",
          students: null,
          lesson: "5:00",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
