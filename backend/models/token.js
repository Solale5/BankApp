'use strict';
const {
  Model
} = require('sequelize');
const User = require('../models/user')



module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, { foreignKey: 'userid' })
    }
  }
  Token.init({
    userid: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};