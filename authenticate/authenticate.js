const jwt = require('jsonwebtoken');
const User = require('../models/user')

 exports.authenticateToken = (req, res, next)=> {
    try{
        console.log(req.query.grpId)
        const token=req.header('authorization')
        //console.log(token)

    const userId=jwt.verify(token, 'd4b0f29b1877137109172a1ed62067fa9351a507f7e8e6ffbdde9252df37870137891da68fc8a215f95a91cda7bcd0d342b190487d51457073bb514ede01861b');
        
        User.findByPk(userId).then(user=>{
           // console.log(JSON.stringify(user))
            req.user=user;
            //res.send("ooooooooooooooooooooooo")
            next();
        })
        .catch(err=>{
            throw new Error(err)
        })
    }
    

    catch(err){
        console.log(err)
         res.status(404).JSON({sucess:false})
    }
}



