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
    // associations can be defined here
  };
  return Category;
};