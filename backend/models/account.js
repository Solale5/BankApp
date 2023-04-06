'use strict';
const {
  Model
} = require('sequelize');

const {Transactions} =  require('../models/transactions')
const {User} =  require('../models/user')

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Transactions, User}) {
      this.hasMany(Transactions)
      this.belongsTo(User)

    }
  }
  Account.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountINTEGER: {
      type: DataTypes.STRING,
      allowNull: false
    },
    routingINTEGER: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Account',
    modelName: 'Account',
  });
  return Account;
};