"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("privileges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      tata_cara_voting: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      profile_kandidat_pengawas: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      profile_kandidat_pengurus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mulai_voting: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      riwayat_voting: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      dashboard: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      dashboard_view_vote: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status_voting_anggota: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_data: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      setting: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("privileges");
  },
};
