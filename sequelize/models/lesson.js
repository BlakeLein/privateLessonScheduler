'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.student,  {
        foreignKey: "id",
        as: "student" ,
        onDelete: 'CASCADE'
      });
      Lesson.belongsTo(models.Instructor, {
        foreignKey: "id",
        as: "instructor" ,
        onDelete: 'CASCADE'
      });
      
    }
  }
  Lesson.init({
    instructor: DataTypes.INTEGER,
    student: DataTypes.INTEGER,
    date: DataTypes.STRING,
    startTime: DataTypes.STRING,
    stopTime: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};