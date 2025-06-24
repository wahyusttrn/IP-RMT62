'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Canvas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Canvas.init({
    title: DataTypes.STRING,
    scene: DataTypes.JSONB,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Canvas',
  });
  return Canvas;
};