const Sequelize = require('sequelize');
const db = require('../db');

const SavedRecipe = db.define('savedrecipe', {
  isFavorite: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = SavedRecipe;
