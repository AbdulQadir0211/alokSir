import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler"
import keys from "../keys.js";
import User from "../models/user.js";

const userAuth=asyncHandler(async(req,res,next)=>{
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "You must be logged in" })
        }
        const token=authorization.replace("Bearer ","")
        const decodedUser=jwt.verify(token,keys.JWT_SECRET)

        req.user=await User.findById(decodedUser._id)
        next()
    } catch (error) {
        return res.status(401).json({ error: "Login to Gain Access" })
    }
})

export default userAuth