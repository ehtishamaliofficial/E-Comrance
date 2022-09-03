import product from "../controllers/productController.js";
import express from 'express';
import { isAuthenticatedUser,authorizedRole } from "../middleware/auth.js";

const productRouter = express.Router();
//Create Product-----!Admin
productRouter.route('/product/new').post(isAuthenticatedUser,authorizedRole('admin'),product.addProduct)
productRouter.route('/product/:id').put(product.updateProduct)
productRouter.route('/product/:id').put(product.updateProduct).delete(product.deleteProduct).get(product.productDetails)
//Public Routes
productRouter.route('/products').get(product.getAllproducts)

export default productRouter;