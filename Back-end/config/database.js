import mongoose from "mongoose";

 const Connect_DB=()=>{
    mongoose.connect('mongodb://localhost:27017/Ecomrance').then((data)=>console.log(`Connected to DB with ${data.connection.host}`)).catch(err=>console.log(err))
}

export default Connect_DB;