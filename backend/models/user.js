'use strict';
const {
  Model
} = require('sequelize');


//const Token = require('../models/token')
const {Token}= require('../models/token')


const jwt = require('jsonwebtoken')


module.exports = (sequelize, DataTypes) => {
  //forwards declaration
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Token}) {
      // define association here
      this.hasMany(Token, { foreignKey: 'userid' })
    }

  }


  User.init({

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING
    }
   
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'dummy',
  });
  return User;
};