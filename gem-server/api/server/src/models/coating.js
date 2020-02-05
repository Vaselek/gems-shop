'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coating = sequelize.define('Coating', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Данное название уже занято!'
      },
      validate:
        {
          notEmpty: {
            args: true,
            msg: 'Название не может быть пустым!'
          },
          notContains: {
            args: '_',
            msg: 'Название не может содержать "_"'
          }
        }
    },
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
  Coating.beforeCreate(async (coating, options) => {
    coating.title = coating.title.toLowerCase();
  });
  return Coating;
};