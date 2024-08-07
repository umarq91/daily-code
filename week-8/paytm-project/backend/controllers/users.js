const zod = require('zod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUpBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})


const signup  = async(req,res)=>{

    // const {success} = signUpBody.parse(req.body)
    // if(!success){
    //     return res.status(411).json({
    //         message:' Incorrect Inputs'
    //     })
    // }
    const {username,firstName,lastName,password} = req.body
    
    const existingUser  = await User.findOne({username})
    
    if(existingUser){
        return res.status(411).json({
            message:'Email already taken / Incorrect Inputs'
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({username,firstName,lastName,password:hashedPassword})
    
    const token = jwt.sign({userId:newUser._id},process.env.JWTSECRET)
    res.status(200).json({
        message:"User Created Successfully",
        token
    })
    }


    const signinBody = zod.object({
        username: zod.string().email(),
        password: zod.string()
    })
    
    const signIn =async(req,res)=>{

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
    
    }

    const updateUser = async (req, res) => {
        try {
            const { userId } = req; // Ensure that `req.userId` is set correctly
            const updateData = req.body;
    
            // Use findOneAndUpdate to get the updated document
            const updatedUser = await User.findOneAndUpdate(
                { id: userId },
                updateData,
                { new: true } // This option returns the updated document
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json({ message: 'User updated successfully'});
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
    module.exports={
        signup,
        signIn,
        updateUser
    }