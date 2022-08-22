import User from "../models/Authntication.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController{
    static signUp = async (req, res) => {
        const {name, email, password, role} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const newUser = new User({
            name,
            email,
            password,
            role
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        const payload = {
            user: {
                id: newUser._id
            }
        };
        const token=await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '2d'});
        res.status(201).json({
            success: true,
            message: "User created successfully",
            token: token
        });
    }
    static signIn = async (req, res) => {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }
        const payload = {
            user: {
                id: user._id
            }
        };
        const token=await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '2d'});
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token: token
        });
    }
}

export default UserController;