"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const argon = require("argon2");
    const crypto = require("crypto");

    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        uuid: crypto.randomUUID(),
        membership_number: "0",
        name: "admin",
        email: "admin@gmail.com",
        password: await argon.hash("admin"),
        phone_number: "+6285885633055",
        company_id: 2,
        status_id: 2,
        privilege_id: 1,
        is_member: false,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("users", null, {});
  },
};
