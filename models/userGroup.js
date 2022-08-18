const Sequelize = require('sequelize')
const sequelize = require('../util/database')


const UserGroup = sequelize.define("userGroup",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement :true,
        primaryKey :true ,
        allowNull: false 
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue: false
    }


})
module.exports = UserGroup ; 