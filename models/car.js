'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  car.init({
    carmodel: DataTypes.STRING,
    cartype: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    createdby: DataTypes.STRING,
    deletedby: DataTypes.STRING,
    updatedby: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'car',
  });
  return car;
};