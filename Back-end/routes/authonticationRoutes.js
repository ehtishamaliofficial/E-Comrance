import UserController from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", UserController.signUp);
userRouter.post("/signin", UserController.signIn);

export default userRouter;
