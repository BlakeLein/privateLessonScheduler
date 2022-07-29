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
    await queryInterface.bulkInsert('Students',
    [
      {
        firstName: "Mini",
        lastName: "Lein",
        email: "mini@hotmail.com",
        password: "123123",
        instrument: "MegaTuba",
        instructor: null,
        lesson:"5:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Big",
        lastName: "Gula",
        email: "big@hotmail.com",
        password: "123123",
        instrument: "Clarihorn",
        instructor:null,
        lesson: "5:00",
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
