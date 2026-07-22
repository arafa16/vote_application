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
        tata_cara_voting: true,
        profile_kandidat_pengawas: true,
        profile_kandidat_pengurus: true,
        mulai_voting: true,
        riwayat_voting: true,
        dashboard: true,
        dashboard_view_vote: true,
        status_voting_anggota: true,
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
