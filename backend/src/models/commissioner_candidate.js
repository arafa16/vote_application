"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class commissioner_candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      commissioner_candidate.belongsTo(models.voting_period, {
        foreignKey: "voting_period_id",
      });
      commissioner_candidate.hasMany(models.commissioner_vote);
    }
  }
  commissioner_candidate.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      voting_period_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      photo_name: DataTypes.STRING,
      photo_url: DataTypes.TEXT,
      vision: DataTypes.TEXT,
      mission: DataTypes.TEXT,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "commissioner_candidate",
      underscored: true,
    },
  );
  return commissioner_candidate;
};
