const router = require('express').Router()
const { signIn, signup, updateUser } = require('../controllers/users')
const {User} = require('../db')
const { authMiddleware } = require('../middlewares/authMiddleware')


router.post('/signup',signup)
router.put('/',authMiddleware,updateUser);


router.post('/signin',signIn)


router.get('/bulk', async (req, res) => {
    const filter = req.params.filter || ""
    console.log(filter);
    
 const users =   await User.find({
        $or: [
            { firstName: { $regex: filter, $options: 'i' } },
            { lastName: { $regex: filter, $options: 'i' } },
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports=router