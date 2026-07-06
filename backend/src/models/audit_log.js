"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class audit_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      audit_log.belongsTo(models.user, {
        foreignKey: "user_id",
      });
    }
  }
  audit_log.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: DataTypes.INTEGER,
      activity: DataTypes.TEXT,
      description: DataTypes.TEXT,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "audit_log",
      underscored: true,
    },
  );
  return audit_log;
};
