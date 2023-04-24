'use strict';
const {
  Model
} = require('sequelize');

const { Transactions } = require('../models/transactions')
const { User } = require('../models/user')

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Transactions, User }) {
      this.hasMany(Transactions, { foreignKey: 'accountid' })
      this.belongsTo(User, { foreignKey: 'userid' })

    }
  }
  Account.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    accountNumber: {
      type: DataTypes.INTEGER
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      //allowNull: false
      defaultValue: 'Checking'
    },

    routingNumber: {
      type: DataTypes.STRING,
      //allowNull: false
    },
    balance: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Account',
    modelName: 'Account',
    noPrimaryKey: true,
  });
  return Account;
};