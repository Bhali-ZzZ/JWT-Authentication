import messageModel from "../models/messageModel.js";

const messageUser = async (req, res) => {
    try {
        const { message } = req.body; // Extract message from request body

        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const newMessage = new messageModel({ message });

        await newMessage.save(); // Save the message to the database

        res.status(201).json({ success: true, message: "Message posted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export default messageUser;
