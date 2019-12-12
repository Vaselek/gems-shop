'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.belongsToMany(models.Gem, {
      through: 'GemCategory',
      as: 'gems',
      foreignKey: 'categoryId',
      otherKey: 'gemId',
      onDelete: 'CASCADE',
      hooks: 'true'
    });
  };
  return Category;
};