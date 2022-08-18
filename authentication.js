const jwt =  require('jsonwebtoken')
const User = require('./models/user')

let tk = 'eyJhbGciOiJIUzI1NiJ9.OA.-KJFYdKRXcAXfR89vcYcw96fkh1wYjJwEgX8D9E4HJc' ;

exports.authenticate = (req, res , next) => {
  
    try {
         const token = req.header('authorization')

         const Id =  jwt.verify(token , tk);

         console.log(Id);
         User.findbyPk(Id)
         .then((user)=>{
            req.user = user;
            next();
         })
         .catch((err)=>{
            res.status(401).json({msg:"Unauthorised login"})
         })
    }
   catch(err){
    
    res
    .status(404) ;
   }
};
