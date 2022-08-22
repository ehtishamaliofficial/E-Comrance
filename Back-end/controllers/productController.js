import productModel from "../models/Product.js";
import ApiFeatures from "./features/apiFeatures.js";

class product{
    //Create new Product-----!Admin Access
    static addProduct = async (req,res)=>{
        if(req.body){
          const product=await productModel.create(req.body);
         return res.status(201).send({
            success:true,
            product
          })
        }
        else{
          return  res.status(401).send({
                success:false,
                massage:"Plaese Enter Some Values in Request Body"
            })
        }
    }
  
    //Get All Products-----!Public Access
    static getAllproducts = async (req,res)=>{
        const removePerPage=req.query.removePerPage?req.query.removePerPage:10;
        const features=new ApiFeatures(productModel.find(),req.query).search().filter().pagination()
        const product=await features.query;
        if(product){
           return res.send(product)
        }
        else{
          return  res.send("Not Any Product Found")
        }
    }

    static updateProduct=async (req,res,next)=>{
       try
       { 
        let product=await productModel.findById(req.params.id)
        if(!product){
          return next({
            statusCode:404,
            message:"Product Not Found"
          })
        }
        product=await productModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });

        res.json({
            success:true,
            product
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            massage:err.message
        })

    }
}

    static deleteProduct=async(req,res)=>{
        const product=await productModel.findById(req.params.id)
        if(!product){
          return res.status(500).json({
                success:false,
                massage:"Product Not Found"
            })
        }
        await product.remove();
        res.status(200).json({
            success:true,
            massage:"Product Deleted Successfully"
        })
    }

    static productDetails = async (req,res)=>{
       try{ 
          const product=await productModel.findById(req.params.id)
        if(!product){
           return res.status(500).json({
                success:false,
                massage:"Product Not Found"
            })
        }
        res.status(200).json({
            success:true,
            product
        })}
        catch(err){
            res.status(401).json({
                success:false,
                massage:err
            })
        }
    }

}

export default product;