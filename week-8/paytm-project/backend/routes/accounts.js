const router = require('express').Router()
const {User,Account} = require('../db')
const { authMiddleware } = require('../middlewares/authMiddleware')

// balance and transfer endpoints

router.get('/balance',authMiddleware,async(req,res)=>{

const {userId} = req

const account = await Account.findOne(userId)

res.json({balance:account.balance})
})



router.post('/transfer',async(req,res)=>{
    
})
module.exports = router