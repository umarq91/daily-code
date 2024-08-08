const router = require('express').Router()
const {User,Account} = require('../db')
const { authMiddleware } = require('../middlewares/authMiddleware')

// balance and transfer endpoints

router.get('/balance',authMiddleware,async(req,res)=>{
try {
    const {userId} = req

const account = await Account.findOne(userId)

res.json({balance:account.balance})
} catch (error) {
   return res.json({message:error.message})
}

})

// MUST FOLLOW ACID PROPERTIES / TRANSACTIONS IN DB to avoid consistency

router.post('/transfer',async(req,res)=>{
    
})
module.exports = router