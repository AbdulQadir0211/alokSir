import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Keys
import keys from "../../keys.js"

//Models
import User from '../../models/user.js'

//Middleware

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!email || !password || !name) {
            return res.status(400).json({ error: "Please add all the fields" })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).json({ error: "User Already Exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({ name, email, password: hashedPassword })
        if (user) {
            return res.status(201).json({ Message: "User Profile Crerated" })
        }

    } catch (error) {
        res.json({ err: "something went wrong" })
        console.log(error)
    }

})

const authUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Please add all the fields" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const passwordMatch = await bcrypt.compare(password, existingUser.password)
            if (passwordMatch) {
                const token = jwt.sign({ _id: existingUser._id }, keys.JWT_SECRET);
                const {_id,name,email}=existingUser
                return res.status(200).json({ message:"Signed In",token,user:{_id,name,email} })
            } else {
                return res.status(401).json({ error: "Wrong Credentials" })
            }
        } else {
            return res.status(404).json({ error: "User Not Found" })
        }
    } catch (error) {
        res.json({ error: "something went wrong" })
        console.log(error)
    }
})

export {
    registerUser,
    authUser
}