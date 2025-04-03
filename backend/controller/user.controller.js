import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req, res) => {
    try {
        console.log("Received signup data:", req.body); // Debugging

        const { fullname, email, password, confirmPassword } = req.body;

        if (!fullname || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            password: hashPassword,
        });

        await newUser.save();

        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            return res.status(201).json({ message: "User created successfully", user: newUser });
        } else {
            return res.status(400).json({ error: "Failed to create user" });
        }
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout=async(req,res)=>{
    try {
        res.clearCookie("jwt");
        res.status(200).json({message:"User removed Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const allUsers =async (req,res)=>{
    try{
        const allUsers=await User.find()
        res.status(201).json({
            allUsers,
        })
    }
    catch(error){
        console.log("Error in allUsers controller :"+ error);
    }
}