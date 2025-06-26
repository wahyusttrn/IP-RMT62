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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title required'
          },
          notEmpty: {
            msg: 'Title required'
          }
        }
      },
      scene: DataTypes.JSONB,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'UserId required'
          },
          notEmpty: {
            msg: 'UserId required'
          },
          isNumeric: {
            msg: 'Invalid UserId'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Canvas'
    }
  );
  return Canvas;
};
