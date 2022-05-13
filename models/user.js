'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
  }
  user.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: {
          args: true,
          msg: 'Email address already in use!'
      }
  },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : (record, options) => {
      record.password = bcrypt.hashSync(record.password, 10)
    }
  },
    sequelize,
    
  });
  return user;
};