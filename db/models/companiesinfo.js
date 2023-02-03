'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompaniesInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompaniesInfo.init({
    companyId: DataTypes.STRING,
    name: DataTypes.STRING,
    ceo: DataTypes.STRING,
    Score: DataTypes.INTEGER,
    sector: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompaniesInfo',
  });
  return CompaniesInfo;
};