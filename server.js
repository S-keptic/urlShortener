const express = require('express');
const urlRoutes = require('./routes/urlRoutes.js');
require('dotenv').config();
const app = express();
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes.js')

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', urlRoutes);  
app.use('/api/auth',authRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected and models synced!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
