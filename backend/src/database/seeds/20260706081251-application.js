"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const crypto = require("crypto");
    return queryInterface.bulkInsert("applications", [
      {
        id: 1,
        uuid: crypto.randomUUID(),
        name: "Vote-Kopkarla",
        description: "application",
        logo: "logo.png",
        logo_url: "/images/logo.png",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("applications", null, {});
  },
};
