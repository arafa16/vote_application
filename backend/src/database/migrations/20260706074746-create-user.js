"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
      },
      membership_number: {
        type: Sequelize.TEXT,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      verification_date: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      verification_token: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      privilege_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_member: {
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
    await queryInterface.dropTable("users");
  },
};
