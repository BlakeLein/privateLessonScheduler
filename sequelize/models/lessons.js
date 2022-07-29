"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lessons.belongsTo(models.Students, {
        foreignKey: "id",
        as: "students",
        onDelete: "CASCADE",
      });
      Lessons.belongsTo(models.Instructors, {
        foreignKey: "id",
        as: "instructors",
        onDelete: "CASCADE",
      });
    }
  }
  Lessons.init(
    {
      instructorId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      startTime: DataTypes.STRING,
      stopTime: DataTypes.STRING,
      cost: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Lessons",
    }
  );
  return Lessons;
};
