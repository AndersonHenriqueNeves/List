'use strict';

module.exports = { 
  up: function(queryInterface) { 
  // logic for transforming into the new state 
  return queryInterface.removeColumn( 'payments', 'professional_id'); 
  }, 
  down: function(queryInterface, Sequelize) { 
  // logic for reverting the changes 
  return queryInterface.addColumn( 'payments', 'professional_id', Sequelize.INTEGER ); 
  }
  }