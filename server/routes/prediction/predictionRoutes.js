import express from "express"
const router = express.Router()

//Controllers
import { model } from "./predictionController.js"

//Middleware
import userAuth from "../../middleware/auth.js"

//Home Page Routes
router.post("/model", userAuth, model)

export default router
