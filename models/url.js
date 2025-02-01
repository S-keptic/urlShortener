const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Url = sequelize.define('Url', {
  original_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shortened_url: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
});

module.exports = Url;
