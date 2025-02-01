const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Analytics = sequelize.define('Analytics', {
  accessed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Analytics;
