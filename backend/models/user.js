'use strict';
const {
  Model
} = require('sequelize');

const { Account } = require('../models/account');
const { transactions } = require('../models/transactions');
const { Token } = require('../models/token')
const validator = require('validator')
const bcrypt = require('bcryptjs')


module.exports = (sequelize, DataTypes) => {
  //forwards declaration
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Token, Address, Account, Transactions }) {
      // define association here
      this.hasMany(Token, { foreignKey: 'userid' })

      this.hasMany(Account, { foreignKey: 'userid' })
      this.hasMany(Transactions, { foreignKey: 'userid' })
    }


    // toJSON() {
    //   return { ...this.get(),  uuid: undefined ,  securityQuestion:undefined}
    // }

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
    manager: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    securityQuestion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    securityAnswer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },

    },
    recoveryEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },

    zipcode: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        isIn:
          [['AK', 'AL', 'AR', 'AZ', 'CA',
            'CO', 'CT', 'DE', 'FL', 'GA',
            'HI', 'IA', 'ID', 'IL', 'IN',
            'KS', 'KY', 'LA', 'MA', 'MD',
            'ME', 'MI', 'MN', 'MO', 'MS',
            'MT', 'NC', 'ND', 'NE', 'NH',
            'NJ', 'NM', 'NV', 'NY', 'OH',
            'OK', 'OR', 'PA', 'RI', 'SC',
            'SD', 'TN', 'TX', 'UT', 'VA',
            'VT', 'WA', 'WI', 'WV', 'WY']]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 8)
        }
        if (user.changed('securityAnswer')) {
          user.securityAnswer = await bcrypt.hash(user.securityAnswer, 8)
        }
      },

    }

  },);

  return User;
};




