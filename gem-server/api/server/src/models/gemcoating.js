'use strict';
module.exports = (sequelize, DataTypes) => {
  const GemCoating = sequelize.define('GemCoating', {
    gemId: DataTypes.INTEGER,
    coatingId: DataTypes.INTEGER
  }, {});
  GemCoating.associate = function(models) {
    // associations can be defined here
  };
  return GemCoating;
};