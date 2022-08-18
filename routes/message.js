const express =  require('express') ;
const router = express.Router();
const messageController= require('../controllers/message')
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const Message=require('../models/message')
const Group=require('../models/group')


const  authenticateController = require('../authenticate/authenticate')

//router.post('/addMessage' ,  authenticateController.authenticateToken ,  messageController.addMessage)
//router.get('/getMessages',  authenticateController.authenticateToken , messageController.getMessages)
//router.get('/isAdmin', authenticateController.authenticateToken, groupController.getIsAdmin)

router.post('/addMessage' , async(req,res)=>{
    console.log(req.query.grpId)
    const token=req.header('authorization')
    

const userId=jwt.verify(token, 'd4b0f29b1877137109172a1ed62067fa9351a507f7e8e6ffbdde9252df37870137891da68fc8a215f95a91cda7bcd0d342b190487d51457073bb514ede01861b');
    
    User.findByPk(userId).then(user=>{
       
        req.user=user;
        const groupId=req.body.groupid
        //onsole.log(groupId)
        const msg=req.body.msg
        //console.log(req.user.name, msg)
    
        req.user.createMessage({
            msg:msg,
            name:req.user.name,
            gId:parseInt(groupId)
    
        }).then(result=>{
           res.status(200).json({result})
        })
        .catch(err=>{
            console.error(err)
        })
        
        
    })
    .catch(err=>{
        throw new Error(err)
    })
    
})

router.get('/getMessages' , async(req,res)=>{
    console.log(req.query.grpId)
    const token=req.header('authorization')
    //console.log(token)

const userId=jwt.verify(token, 'd4b0f29b1877137109172a1ed62067fa9351a507f7e8e6ffbdde9252df37870137891da68fc8a215f95a91cda7bcd0d342b190487d51457073bb514ede01861b');
    
    User.findByPk(userId).then(user=>{
       // console.log(JSON.stringify(user))
        req.user=user;
        
    const groupId = req.query.grpId

    Message.findAll({where:{gId: groupId}})
    .then(messages=>{
        //console.log(messages)
        res.status(200).json({messages})
    })
    .catch(err=>console.log(err))
        
        
        
    })
    .catch(err=>{
        throw new Error(err)
    })
})
module.exports = router ;