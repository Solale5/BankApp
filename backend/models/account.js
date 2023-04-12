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
      this.hasMany(Transactions)
      this.belongsTo(User, { foreignKey: 'userid' })

    }
  }
  Account.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Checking',
      validate: {
        isIn: [['Checking', 'Saving', 'Credit']]
      }
    },
    accountNumber: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isNumeric: true,
        len: [10, 12]
      }
    },
    routingNumber: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isNumeric: true,
        len: 9
      }
    },
    balance: {
      type: DataTypes.STRING,
      defaultValue: 0.0,
      validate: {
        isFloat: true
      }
    }
  }, {
    sequelize,
    tableName: 'Account',
    modelName: 'Account',
  });
  return Account;
};