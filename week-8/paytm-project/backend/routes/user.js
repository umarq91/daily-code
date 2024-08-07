const router = require('express').Router()
const {User} = require('../db')
const zod = require('zod')
const bcrypt = require('bcrypt')

const signUpBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post('/signup',async(req,res)=>{

// const {success} = signUpBody.parse(req.body)
// if(!success){
//     return res.status(411).json({
//         message:' Incorrect Inputs'
//     })
// }
const {username,firstname,lastname,password} = req.body

const existingUser  = await User.findOne({username})

if(existingUser){
    res.status(411).json({
        message:'Email already taken / Incorrect Inputs'
    })
}
const hashedPassword = await bcrypt.hash(password, 10);
const newUser = await User.create({username,firstname,lastname,password:hashedPassword})

const token = jwt.sign({userId:newUser._id},process.env.JWTSECRET)
res.status(200).json({
    message:"User Created Successfully",
    token
})
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post('/signin',async(req,res)=>{

    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({ username: req.body.username })
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

   const passwordMatch = await bcrypt.compare(req.body.password, user.password)

   if(!passwordMatch){
    return res.status(404).json({
        message:"Incorrect password"
    })
   }

   const token = jwt.sign({userId:user._id},process.env.JWTSECRET)

   res.json({
    token
   })

})

module.exports = router