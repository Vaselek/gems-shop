'use strict';
module.exports = (sequelize, DataTypes) => {
  const GemStone = sequelize.define('GemStone', {
    gemId: DataTypes.INTEGER,
    stoneId: DataTypes.INTEGER
  }, {});
  GemStone.associate = function(models) {
    // associations can be defined here
  };
  return GemStone;
};