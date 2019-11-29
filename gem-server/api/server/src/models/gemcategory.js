'use strict';
module.exports = (sequelize, DataTypes) => {
  const GemCategory = sequelize.define('GemCategory', {
    gemId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  GemCategory.associate = function(models) {
    // associations can be defined here
  };
  return GemCategory;
};