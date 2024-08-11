const router = require('express').Router()
const { signIn, signup, updateUser, bulk } = require('../controllers/users')
const {User} = require('../db')
const { authMiddleware } = require('../middlewares/authMiddleware')


router.put('/',authMiddleware,updateUser);
router.post('/signup',signup)
router.post('/signin',signIn)
router.get('/bulk',bulk)

router.get('/me',authMiddleware,async(req,res)=>{
    const {userId} = req
    const user = await User.findById(userId)
    const {password, ...others} = user._doc
    res.json(others)
})
module.exports=router