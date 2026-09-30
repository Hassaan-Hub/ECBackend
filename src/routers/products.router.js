const express = require('express');
const { createProduct, singleProduct } = require('../controllers/product.controller');
const multer = require('multer');
const authMiddleware = require('../midleware/authMidleware');

const productRouter = express.Router();

const uploadImage = multer({ Storage: multer.memoryStorage })

productRouter.post('/create-product', authMiddleware, uploadImage.single('image'), createProduct)
productRouter.get('/product', authMiddleware, singleProduct)

module.exports = productRouter;