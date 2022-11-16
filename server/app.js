import express from "express"
import mongoose from "mongoose"
const PORT=5000
import cors from "cors"

//keys
import { keys } from "./keys.js"

//Routes
import userRoutes from "./routes/user/userRoutes.js"
import predictionRoutes from "./routes/prediction/predictionRoutes.js"

//Database connection
mongoose.connect(keys.MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("error ", err)
})

const app=express()
app.use(express.json())
app.use(cors())
//Routes
app.use('/user',userRoutes)
app.use('/prediction',predictionRoutes)

app.listen(PORT,()=>{
    console.log("Server is running on ", PORT)
})