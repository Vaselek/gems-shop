'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coating = sequelize.define('Coating', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Coating.associate = function(models) {
    Coating.belongsToMany(models.Gem, {
      through: 'GemCoating',
      as: 'gems',
      foreignKey: 'coatingId',
      otherKey: 'gemId'
    });
  };
  return Coating;
};