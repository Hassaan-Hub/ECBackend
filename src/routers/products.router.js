const express = require('express');
const multer = require('multer');
const authMiddleware = require('../midleware/authMidleware');
const {
    createProduct,
    singleProduct,
    allProducts,
    updateProduct,
    deleteProduct
}
    = require('../controllers/product.controller');

const productRouter = express.Router();

const uploadImage = multer({ Storage: multer.memoryStorage });

productRouter.post('/create-product', authMiddleware, uploadImage.single('image'), createProduct);
productRouter.get('/products', authMiddleware, allProducts);
productRouter.get('/product/:id', authMiddleware, singleProduct);
productRouter.put('/product/:id', authMiddleware, updateProduct);
productRouter.delete('/product/:id', authMiddleware, deleteProduct);

module.exports = productRouter;