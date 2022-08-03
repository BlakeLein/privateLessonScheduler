"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Instructors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instructors.hasMany(models.Lessons, {
        foreignKey: "instructorId",
        as: "lessons",
      });
    }
  }
  Instructors.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      instrument: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Instructors",
    }
  );
  return Instructors;
};