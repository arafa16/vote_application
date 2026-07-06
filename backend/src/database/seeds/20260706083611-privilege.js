"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const crypto = require("crypto");
    return queryInterface.bulkInsert("privileges", [
      {
        id: 1,
        uuid: crypto.randomUUID(),
        name: "admin",
        voting_page: true,
        dashboard: true,
        user_data: true,
        setting: true,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("privileges", null, {});
  },
};
