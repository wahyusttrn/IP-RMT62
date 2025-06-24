'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Canvas extends Model {
    static associate(models) {
      Canvas.belongsTo(models.User);
    }
  }
  Canvas.init(
    {
      title: DataTypes.STRING,
      scene: DataTypes.JSONB,
      UserId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Canvas'
    }
  );
  return Canvas;
};
