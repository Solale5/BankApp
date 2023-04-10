'use strict';
const {
  Model
} = require('sequelize');
const Transactions =  require('../models/transactions')


module.exports = (sequelize, DataTypes) => {
  class Source extends Model {
    static associate({Transactions}) {
      this.belongsTo(Transactions)
    }
  }
  Source.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sourceType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sourceLocation: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Source',
    modelName: 'Source',
  });
  return Source;
};