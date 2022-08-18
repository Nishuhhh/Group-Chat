require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const sequelize = require('./util/database')
const userRoutes = require('./routes/user')
const groupRoutes = require('./routes/group') 
const messageroutes = require('./routes/message')
const adminRoutes = require('./routes/admin')


const User = require('./models/user')
const Group =  require('./models/group')
const userGroup = require('./models/userGroup')
const message = require('./models/message')



const app = express()


app.use(cors())
app.use(bodyParser.json())

app.use(userRoutes);
app.use(groupRoutes);
app.use(messageroutes)
app.use(adminRoutes)




User.belongsToMany(Group, { through: userGroup });
Group.belongsToMany(User, { through: userGroup });


User.hasMany(message)
message.belongsTo(User)

sequelize.sync()
.then((res)=>{
    //console.log(res)
    app.listen(3000)
}).catch(err=>console.log(err))