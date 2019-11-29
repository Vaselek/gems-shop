'use strict';
module.exports = (sequelize, DataTypes) => {
  const GemMetal = sequelize.define('GemMetal', {
    gemId: DataTypes.INTEGER,
    metalId: DataTypes.INTEGER
  }, {});
  GemMetal.associate = function(models) {
    // associations can be defined here
  };
  return GemMetal;
};