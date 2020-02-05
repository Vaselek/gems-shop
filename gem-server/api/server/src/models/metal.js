'use strict';
module.exports = (sequelize, DataTypes) => {
  const Metal = sequelize.define('Metal', {
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
  Metal.associate = function(models) {
    Metal.belongsToMany(models.Gem, {
      through: 'GemMetal',
      as: 'gems',
      foreignKey: 'metalId',
      otherKey: 'gemId'
    });
  };
  Metal.beforeCreate(async (metal, options) => {
    metal.title = metal.title.toLowerCase();
  });
  return Metal;
};