'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gem = sequelize.define('Gem', {
    title: DataTypes.STRING,
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: [{ field: 'code', text: 'Данный код уже занят!' }]
      },
      validate:
        {
          notEmpty: {
            args: true,
            msg: 'Код не может быть пустым!'
          }
        }
    },
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    image: DataTypes.STRING
  }, {});
  Gem.associate = function(models) {
    Gem.belongsToMany(models.Category, {
      through: 'GemCategory',
      as: 'categories',
      foreignKey: 'gemId',
      otherKey: 'categoryId',
      onDelete: 'CASCADE',
      hooks: 'true'
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