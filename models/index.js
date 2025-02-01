const sequelize = require('../config/db.js');
const Url = require('./url.js');
const Analytics = require('./analytics.js');

Url.hasMany(Analytics, { foreignKey: 'url_id' });
Analytics.belongsTo(Url, { foreignKey: 'url_id' });

const db = {
  sequelize,
  Url,
  Analytics,
};

module.exports = db;
