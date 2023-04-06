'use strict';
const {
  Model
} = require('sequelize');

const {Account} = require('../models/account');
const {transactions} = require('../models/transactions');
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
    static associate({Token, Address, Account, Transactions}) {
      // define association here
      this.hasMany(Token, { foreignKey: 'userid' })

      // not tested yet 
        this.hasOne(Address)
        this.hasMany(Account)
        this.hasMany(Transactions)
    }

  }

  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    securityQuestion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recoveryEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
  });

  return User;
};



  