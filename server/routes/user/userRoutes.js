import express from "express"
const router = express.Router()
import { registerUser, authUser } from "./userController.js"

import keys from "../../keys.js"

//Middleware
import userAuth from "../../middleware/auth.js"

//User Authorization Routes
router.post("/register", registerUser)
router.post("/signin", authUser)

export default router