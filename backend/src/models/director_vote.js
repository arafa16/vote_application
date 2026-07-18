"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class director_vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      director_vote.belongsTo(models.voting_period, {
        foreignKey: "voting_period_id",
      });
      director_vote.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      director_vote.belongsTo(models.director_candidate, {
        foreignKey: "director_candidate_id",
      });
    }
  }
  director_vote.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      voting_period_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      director_candidate_id: DataTypes.INTEGER,
      vote_time: DataTypes.DATE,
      ip_address: DataTypes.STRING,
      is_validate: DataTypes.BOOLEAN,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "director_vote",
      underscored: true,
    },
  );
  return director_vote;
};
