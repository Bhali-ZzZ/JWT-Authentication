import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"


const port = 4000
const app = express()


connectDB()

// middlewares

app.use(express.json())
app.use(cors())

//api
app.use("/api/user" , userRouter)



app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port , ()=>{
    console.log(`server is started on http://localhost:${port}`)
})