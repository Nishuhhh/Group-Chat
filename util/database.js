const Sequelize = require('sequelize')

const sequelize = new Sequelize('groupchat' , 'root' , 'nishu123' ,{
 dialect : 'mysql' ,
 host : 'localhost'


})


module.exports = sequelize ;