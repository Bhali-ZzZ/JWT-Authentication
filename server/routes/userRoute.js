import express from "express"
import { registerUsers , loginUser } from "../controllers/userController.js"
import messageUser from "../controllers/messageController.js"



const userRouter = express.Router()
userRouter.post("/register" , registerUsers)
userRouter.post("/login" , loginUser)
userRouter.post("/message", messageUser)

export default userRouter