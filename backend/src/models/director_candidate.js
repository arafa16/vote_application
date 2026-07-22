"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class director_candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      director_candidate.belongsTo(models.voting_period, {
        foreignKey: "voting_period_id",
      });
      director_candidate.hasMany(models.director_vote);
    }
  }
  director_candidate.init(
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
      modelName: "director_candidate",
      underscored: true,
    },
  );
  return director_candidate;
};
