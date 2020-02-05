'use strict';
import bcrypt from "bcrypt";
import nanoid from "nanoid";

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
  Category.beforeCreate(async (category, options) => {
    category.title = category.title.toLowerCase();
  });
  return Category;
};