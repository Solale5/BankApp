'use strict';
const {
  Model
} = require('sequelize');

const {Source} =  require('../models/source')
const {Account} =  require('../models/account')
const {User} =  require('../models/user')


module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Source, Account, User}) {
      this.hasOne(Source)
      this.belongsTo(Account)
      this.belongsTo(User)
    }
  }
  Transactions.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    routingINTEGER: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transactionAmt: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    checkINTEGER: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    tableName: 'Transactions',
    modelName: 'Transactions',
  });
  return Transactions;
};