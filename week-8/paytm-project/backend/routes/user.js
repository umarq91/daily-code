const router = require('express').Router()
const { signIn, signup, updateUser } = require('../controllers/users')
const {User} = require('../db')
const { authMiddleware } = require('../middlewares/authMiddleware')


router.put('/',authMiddleware,updateUser);

router.post('/signup',signup)

router.post('/signin',signIn)


router.get('/bulk', async (req, res) => {
    const filter = req.params.filter || ""
 const users =   await User.find({
        $or: [
            { name: { $regex: filter, $options: 'i' } },
            { email: { $regex: filter, $options: 'i' } },
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