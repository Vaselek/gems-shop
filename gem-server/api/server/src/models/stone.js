'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stone = sequelize.define('Stone', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Stone.associate = function(models) {
    Stone.belongsToMany(models.Gem, {
      through: 'GemStone',
      as: 'gems',
      foreignKey: 'stoneId',
      otherKey: 'gemId'
    });
  };
  return Stone;
};