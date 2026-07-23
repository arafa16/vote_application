"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("email_queues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      to: {
        type: Sequelize.JSON,
      },
      cc: {
        type: Sequelize.JSON,
      },
      bcc: {
        type: Sequelize.JSON,
      },
      subject: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.ENUM(
          "verification",
          "reminder",
          "notification",
          "password_reset",
        ),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "processing", "sent", "failed"),
        defaultValue: "pending",
      },
      retry_count: {
        type: Sequelize.INTEGER,
      },
      error_message: {
        type: Sequelize.TEXT,
      },
      scheduled_at: {
        type: Sequelize.DATE,
      },
      sent_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("email_queues");
  },
};
