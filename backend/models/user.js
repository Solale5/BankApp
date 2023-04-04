'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }


  }


  User.prototype.generateAuthToken =   async  function () {
    const user = this

    // change this later to a random string
    const token = jwt.sign({ _id: user.password}, 'thisismynewcourse')
    
    user.tokens = user.tokens.concat({ token })

    return token
    }


  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    password: {
      type: DataTypes.STRING
    }
    , tokens: {
      type: DataTypes.JSON
    }

  
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'dummy',
  });
  return User;
};