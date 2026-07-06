"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vote.belongsTo(models.voting_period, {
        foreignKey: "voting_period_id",
      });
      vote.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      vote.belongsTo(models.candidate, {
        foreignKey: "candidate_id",
      });
    }
  }
  vote.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      voting_period_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      candidate_id: DataTypes.INTEGER,
      vote_time: DataTypes.DATE,
      ip_address: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "vote",
      underscored: true,
    },
  );
  return vote;
};
