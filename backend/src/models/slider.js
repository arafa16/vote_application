"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class slider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  slider.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      image_name: DataTypes.STRING,
      image_url: DataTypes.TEXT,
      sequence: DataTypes.DECIMAL,
      page_view: DataTypes.ENUM("beranda", "voting_procedur"),
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "slider",
      underscored: true,
    },
  );
  return slider;
};
