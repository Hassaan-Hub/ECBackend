const express = require('express');
const createProduct = require('../controllers/product.controller');
const multer = require('multer');

const productRouter = express.Router();

const uploadImage = multer({ Storage: multer.memoryStorage })

productRouter.post('/create-product',uploadImage.single('image'), createProduct)

module.exports = productRouter;