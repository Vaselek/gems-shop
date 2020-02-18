'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Gems',
      'discount',
      Sequelize.DECIMAL
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Gems',
      'discount'
    );
  }
};
