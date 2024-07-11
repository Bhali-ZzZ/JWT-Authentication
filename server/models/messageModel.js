import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message:{type:String , required:true}
})

const messageModel = mongoose.models.message || mongoose.model("message",messageSchema)

export default messageModel