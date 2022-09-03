import ErrorHandler from "../util/errorHandler.js";
import jwt from 'jsonwebtoken'
import User from "../models/Authntication.js";

export const isAuthenticatedUser = async (req,res,next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Login/SignUp to use this Resouces",401))
    }

    const decode = await jwt.verify(token,process.env.SECRET_KEY)
    req.user = await User.findById(decode.user.id)
    next()
}

export const authorizedRole = (...role) => {
    return (req,res,next) => {
        if (!role.includes(req.user.role)) {
            new ErrorHandler(`Role: ${req.user.role} is not allowed to acsses this resoueces!`,404)
        }
        next();
    }
}