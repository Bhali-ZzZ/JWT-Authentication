import validator from "validator";
import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

const registerUsers = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const exist = await userModel.findOne({ email });
        
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }
        
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        });
        
        await newUser.save();
        
        res.json({ success: true, message: "User has been registered" });
        
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Incorrect password" });
        }
        
        const token = createToken(user._id);
        
        res.json({ success: true, user, token });
        
    } catch (error) {
        console.error("Login error:", error);
        res.json({ success: false, message: "Server error" });
    }
};

// create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { registerUsers, loginUser };
