'use strict';
module.exports = (sequelize, DataTypes) => {
  const Metal = sequelize.define('Metal', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Metal.associate = function(models) {
    Metal.belongsToMany(models.Gem, {
      through: 'GemMetal',
      as: 'gems',
      foreignKey: 'metalId',
      otherKey: 'gemId'
    });
  };
  return Metal;
};