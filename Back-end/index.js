import express from "express";
import Connect_DB from "./config/database.js";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";
import userRouter from './routes/authonticationRoutes.js';
import cookieParser from "cookie-parser";
import error from "./middleware/error.js";

const app = express();


//dotenv
dotenv.config({ path: "./config/config.env" });

//DataBase Connection
Connect_DB();

//Routes
app.use(express.json())
app.use(cookieParser())
app.use('/api',productRouter)
app.use('/api',userRouter)

//Error Handler
app.use(error)


app.listen(process.env.PORT,() => {
    console.log(`Server is listening`)
})