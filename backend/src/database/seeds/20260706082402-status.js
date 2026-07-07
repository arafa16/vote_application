"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const crypto = require("crypto");
    const statuses = ["registered", "active", "inactive", "deleted"];

    const records = [];
    statuses.forEach((status, index) => {
      records.push({
        id: index + 1,
        uuid: crypto.randomUUID(),
        name: status,
        sequence: index + 1,
        code: index + 1,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    await queryInterface.bulkInsert("statuses", records, {});
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("statuses", null, {});
  },
};
