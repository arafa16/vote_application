"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.company, {
        foreignKey: "company_id",
      });
      user.belongsTo(models.status, {
        foreignKey: "status_id",
      });
      user.belongsTo(models.privilege, {
        foreignKey: "privilege_id",
      });
    }
  }
  user.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      membership_number: DataTypes.TEXT,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      privilege_id: DataTypes.INTEGER,
      is_member: DataTypes.BOOLEAN,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    },
  );
  return user;
};
