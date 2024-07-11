import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://bhali_tech1:123@cluster0.uxgmvo6.mongodb.net/auth-form").then(()=>{console.log("DB Connected")})
 }