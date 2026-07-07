"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const crypto = require("crypto");
    const companies = ["Lintasarta", "Kopkarla", "KSPS", "LMD"];

    const records = [];
    companies.forEach((company, index) => {
      records.push({
        id: index + 1,
        uuid: crypto.randomUUID(),
        name: company,
        sequence: index + 1,
        code: index + 1,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
    return queryInterface.bulkInsert("companies", records);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("companies", null, {});
  },
};
