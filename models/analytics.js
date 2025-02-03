const { DataTypes, STRING } = require('sequelize');
const sequelize = require('../config/db.js');

const Analytics = sequelize.define('Analytics', {
  accessed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  ip_address:{
    type:DataTypes.STRING,
  },
  user_agent:{
    type:DataTypes.STRING,
  },
  referer:{
    type:DataTypes.STRING,
  },
  country:{
    type:DataTypes.STRING,
  },
  city:{
    type:DataTypes.STRING,
  }
});

module.exports = Analytics;
