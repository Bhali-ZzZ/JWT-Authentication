import express from "express"
import { registerUsers , loginUser } from "../controllers/userController.js"



const userRouter = express.Router()
userRouter.post("/register" , registerUsers)
userRouter.post("/login" , loginUser)

export default userRouter