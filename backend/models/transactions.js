'use strict';
const {
  Model
} = require('sequelize');

const { Source } = require('../models/source')
const { Account } = require('../models/account')
const { User } = require('../models/user')


module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Source, Account, User }) {
      this.hasOne(Source)
      this.belongsTo(Account, { foreignKey: 'accountid' })
      this.belongsTo(User, { foreignKey: 'userid' })
    }
  }
  Transactions.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accountid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    routingINTEGER: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transactionAmt: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    checkINTEGER: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Transactions',
    modelName: 'Transactions',
  });
  return Transactions;
};