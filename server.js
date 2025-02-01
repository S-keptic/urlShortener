const express = require('express');

require('dotenv').config();

const app = express();
const sequelize = require('./config/db.js')

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Database connected and models synced!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
