const {Model,dataTypes, DataTypes} = require('sequelize')
const {sequelize} = require('./index.js')

class User extends Model{}

User.init({
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,

    },
},{sequelize,modelName:'User',timestamps:true})

User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  
  module.exports = User;