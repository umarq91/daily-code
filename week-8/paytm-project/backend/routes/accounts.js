const router = require('express').Router()
const {User,Account} = require('../db')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { default: mongoose } = require('mongoose');
// balance and transfer endpoints

router.get('/balance',authMiddleware,async(req,res)=>{
try {

    const {userId} = req

    const acc = await Account.findOne({userId})


    res.json({
        balance:acc.balance
    })

} catch (error) {
   return res.json({message:error.message})
}

})

// MUST FOLLOW ACID PROPERTIES / TRANSACTIONS IN DB to avoid consistency
// to , amount
router.post('/transfer',authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession()
const {amount,to} = req.body
    try {
        // start transaction
        session.startTransaction()
        const account = await Account.findOne({ userId: req.userId }).session(session)

        if(!account || account.balance < amount){
            return res.status(400).json({
                message:'Insufficient balance'
            })
        }


        const toAccount = await Account.findOne({userId:to}).session(session)
        if(!toAccount){
            return res.status(400).json({
                message:'User not found'
            })
        }


        // perform operations
// Perform the transfer
await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

// Commit the transaction
await session.commitTransaction();
res.json({
    message: "Transfer successful"
});

    } catch (error) {
        session.abortTransaction();
    }finally{
        session.endSession()
    }
})
module.exports = router