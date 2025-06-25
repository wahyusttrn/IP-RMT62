'use strict';
const { Model } = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Canvas);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name required'
          },
          notEmpty: {
            msg: 'Name required'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email already exist'
        },
        validate: {
          notNull: {
            msg: 'Email required'
          },
          notEmpty: {
            msg: 'Email required'
          },
          isEmail: {
            msg: 'Invalid email format'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password required'
          },
          notEmpty: {
            msg: 'Password required'
          },
          isEightChar(value) {
            if (value.length < 8) {
              throw new Error('Password at least 8 characters');
            }
          }
        }
      },
      tier: {
        type: DataTypes.STRING,
        defaultValue: 'Free'
      },
      profilePic: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate(model) {
          model.password = hashPass(model.password);
        }
      },
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
