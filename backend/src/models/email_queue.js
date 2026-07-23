"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class email_queue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  email_queue.init(
    {
      uuid: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      to: DataTypes.JSON,
      cc: DataTypes.JSON,
      bcc: DataTypes.JSON,
      subject: DataTypes.STRING,
      body: DataTypes.TEXT,
      type: DataTypes.ENUM(
        "verification",
        "reminder",
        "notification",
        "password_reset",
      ),
      status: DataTypes.ENUM("pending", "processing", "sent", "failed"),
      retry_count: DataTypes.INTEGER,
      error_message: DataTypes.TEXT,
      scheduled_at: DataTypes.DATE,
      sent_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "email_queue",
      underscored: true,
    },
  );
  return email_queue;
};
