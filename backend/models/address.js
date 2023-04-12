'use strict';
const {
  Model
} = require('sequelize');
const { User } = require('../models/user')

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User)
    }

  }
  Address.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    zipcode: {
      type: DataTypes.STRING,
      validate: {
        is: ["^\d{5}(?:[-\s]\d{4})?$"]
      }
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
    },
  }, {
    sequelize,
    tableName: 'Address',
    modelName: 'Address',
  });
  return Address;
};