const express = require('express')
const sequelize = require('./config/database.js')

const app = express();
sequelize.authenticate()
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server up on ${PORT}`)
}) 