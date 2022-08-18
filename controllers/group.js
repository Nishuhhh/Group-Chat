const user = require('../models/user')
const Group = require('../models/group');
const UserGroup = require('../models/userGroup');

exports.creategroup=(req,res)=>{
    let groupname = req.body.groupname ;
    req.user.createGroup({groupname:groupname}).then(result=>{

        UserGroup.update({isAdmin:true},{where:{userId : req.user.id}})
        .then(result=>{
            res.status(200).json("group added")
        })
        
    })
    .catch(err=>{
        console.log(err);
    })
}


exports.getgroups=(req,res)=>{
   console.log(req.user.id)
   
   req.user.getGroups()
   .then(groups=>{
    res.status(200).json({groups})
    })
    .catch(err=>{
        console.log(err)
    })



}

exports.getIsAdmin = (req, res, next)=>{
    console.log(req.query.grpId)
    const groupId = req.query.grpId
    UserGroup.findOne({where:{
        userId: req.user.id,
        groupId: parseInt(groupId)
    }})
    .then(user=>{
        //console.log(user)
        res.status(200).json({user})
    })
    .catch(err=>console.log(err))
    
}