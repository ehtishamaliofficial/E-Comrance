import  express from "express";
import  Connect_DB  from "./config/database.js";
import dotenv  from "dotenv";
import productRouter from "./routes/productRoutes.js";
import userRouter from './routes/authonticationRoutes.js';


const app=express();


//dotenv
dotenv.config({path:"./config/config.env"});

//DataBase Connection
Connect_DB();

//Routes
app.use(express.json())
app.use('/api',productRouter)
app.use('/api', userRouter)

//Error Handler
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening`)
})