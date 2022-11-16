import asyncHandler from "express-async-handler"

const model = asyncHandler(async (req, res) => {
    try {
        const {first,second,third,fourth,fifth}=req.body
        if(!first || !second || !third || !fourth || !fifth){
            return res.status(400).json({ error: "Please add all the fields" })
        }
        console.log(req.body)
        return res.status(200).json("Working")
    } catch (error) {
        return error
    }
})

export { model }