const express= require('express')
const router =  express.Router()
const groupController = require('../controllers/group')

const authenticateController = require('../authenticate/authenticate')
router.post('/creategroup',authenticateController.authenticateToken, groupController.creategroup)
router.get('/getgroups',authenticateController.authenticateToken, groupController.getgroups)
router.get('/isAdmin', authenticateController.authenticateToken, groupController.getIsAdmin)


module.exports = router





