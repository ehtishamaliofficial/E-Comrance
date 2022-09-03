import productModel from "../models/Product.js";
import ApiFeatures from "./features/apiFeatures.js";
import ErrorHandler from "../util/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

class product {
    //Create new Product-----!Admin Access
    static addProduct = catchAsyncError(async (req,res,next) => {
        const { name,descripton,price,catgoray,stock,user } = req.body;
        req.body.user = req.user.id
        if (!name || !descripton || !price || !catgoray || !stock || !user) {
            return next(new ErrorHandler("Enter Values to Add Product",404))
        }
        const product = await productModel.create(req.body);
        res.status(201).send({
            success: true,
            product
        })
    });

    //Get All Products-----!Public Access
    static getAllproducts = async (req,res,next) => {
        // const removePerPage = req.query.removePerPage ? req.query.removePerPage : 10;
        // const features = new ApiFeatures(productModel.find(),req.query).search().filter().pagination()
        // const product = await features.query;
        const product = await productModel.find();
        if (product) {
            return res.send(product)
        }
        else {
            return next(new ErrorHandler("Not Any Product Found",200))
        }
    }

    static updateProduct = async (req,res,next) => {
        try {
            let product = await productModel.findById(req.params.id)
            if (!product) {
                return next(new ErrorHandler("Product Not Found",404))
            }
            product = await productModel.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
                runValidators: true,
                useFindAndModify: false
            });

            res.json({
                success: true,
                product
            })
        }
        catch (err) {
            res.status(500).json({
                success: false,
                massage: err.message
            })

        }
    }

    static deleteProduct = async (req,res,next) => {
        const product = await productModel.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler("Product  Found",404))
        }
        await product.remove();
        res.status(200).json({
            success: true,
            massage: "Product Deleted Successfully"
        })
    }

    static productDetails = async (req,res,next) => {
        try {
            const product = await productModel.findById(req.params.id)
            if (!product) {
                return next(new ErrorHandler("Product Not Found",404))
            }
            res.status(200).json({
                success: true,
                product
            })
        }
        catch (err) {
            res.status(401).json({
                success: false,
                massage: err
            })

        }
    }

}

export default product;