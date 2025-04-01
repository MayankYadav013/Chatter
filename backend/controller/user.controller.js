import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup=async(req,res)=>{
    try {
        const {fullname,email,password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return res.status(400).json({error:"Password don't match"});
    }
    const user= await User.findOne({email});
    if(user){
        return res.status(400).json({error:"User already exists"});
    }
    //hashing the password
    const hashPassword=await bcrypt.hash(password,10);
    const newUser= await new User({
        fullname,
        email,
        password:hashPassword,
    });
    await newUser.save();
    if(newUser){
        createTokenAndSaveCookie(newUser._id,res);
        res.status(201).json({message:"User created successfully",newUser});   
    }  
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"}); 
    }
};

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
    }catch (error){
        console.log(error);
        res.status(500).json({error:"Internal server error"}); 
    }
}
