import User from "../models/Authntication.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendToken from "../util/sendToken.js";

class UserController {
    static signUp = async (req,res) => {
        const { name,email,password,role,avatar } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const newUser = new User({
            name,
            email,
            password,
            role,
            avatar
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password,salt);
        await newUser.save();
        const payload = {
            user: {
                id: newUser._id
            }
        };
        const token = await jwt.sign(payload,process.env.SECRET_KEY,{ expiresIn: '2d' });
        const option = {
            expires: new Date(
                Date.now() + 2 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        res.status(201).cookie('token',token,option).json({
            success: true,
            message: "User Registered successfully",
            user,
            token
        });
    }
    static signIn = async (req,res) => {
        const { email,password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Plz Fill All field!"
            });
        }
        else {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exist"
                });
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if (!isMatch) {
                return res.status(400).cookie('token',"").json({
                    success: false,
                    message: "Incorrect password"
                });
            }
            const payload = {
                user: {
                    id: user._id
                }
            };
            const token = await jwt.sign(payload,process.env.SECRET_KEY,{ expiresIn: '2d' });
            const option = {
                expires: new Date(
                    Date.now() + 2 * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
            res.status(200).cookie('token',token,option).json({
                success: true,
                message: "User signed in successfully",
                user,
                token
            });
        }
    }
}

export default UserController;