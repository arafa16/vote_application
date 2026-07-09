"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class commissioner_vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      commissioner_vote.belongsTo(models.voting_period, {
        foreignKey: "voting_period_id",
      });
      commissioner_vote.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      commissioner_vote.belongsTo(models.commissioner_candidate, {
        foreignKey: "commissioner_candidate_id",
      });
    }
  }
  commissioner_vote.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      voting_period_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      commissioner_candidate_id: DataTypes.INTEGER,
      vote_time: DataTypes.DATE,
      ip_address: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "commissioner_vote",
      underscored: true,
    },
  );
  return commissioner_vote;
};
