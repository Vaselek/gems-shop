'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gem = sequelize.define('Gem', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    image: DataTypes.STRING
  }, {});
  Gem.associate = function(models) {
    Gem.belongsToMany(models.Category, {
      through: 'GemCategory',
      as: 'categories',
      foreignKey: 'gemId',
      otherKey: 'categoryId'
    });
    Gem.belongsToMany(models.Coating, {
      through: 'GemCoating',
      as: 'coatings',
      foreignKey: 'gemId',
      otherKey: 'coatingId'
    });
    Gem.belongsToMany(models.Metal, {
      through: 'GemMetal',
      as: 'metals',
      foreignKey: 'gemId',
      otherKey: 'metalId'
    });
    Gem.belongsToMany(models.Stone, {
      through: 'GemStone',
      as: 'stones',
      foreignKey: 'gemId',
      otherKey: 'stoneId'
    });
  };
  return Gem;
};