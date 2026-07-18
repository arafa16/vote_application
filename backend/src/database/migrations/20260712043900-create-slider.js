"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sliders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
      },
      image_name: {
        type: Sequelize.STRING,
      },
      image_url: {
        type: Sequelize.TEXT,
      },
      sequence: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      page_view: {
        type: Sequelize.ENUM,
        values: ["beranda", "voting_procedur"],
        allowNull: false,
        defaultValue: "beranda",
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
    await queryInterface.dropTable("sliders");
  },
};
