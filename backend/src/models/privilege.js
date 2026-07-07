"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class privilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  privilege.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      voting_page: DataTypes.BOOLEAN,
      dashboard: DataTypes.BOOLEAN,
      user_data: DataTypes.BOOLEAN,
      setting: DataTypes.BOOLEAN,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "privilege",
      created_at: "created_at",
      updated_at: "updated_at",
      underscored: true,
    },
  );
  return privilege;
};
