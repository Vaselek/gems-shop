'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stone = sequelize.define('Stone', {
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