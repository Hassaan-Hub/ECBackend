const Products = require("../models/product.model");
const imagekitData = require("../services/storage.services");

const Joi = require("joi");

const productSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 3 characters",
            "string.max": "Title must not exceed 100 characters",
            "any.required": "Title is required"
        }),

    price: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
            "any.required": "Price is required"
        }),

    category: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Category is required",
            "any.required": "Category is required"
        }),

    stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Stock must be a number",
            "number.integer": "Stock must be an integer",
            "number.min": "Stock cannot be negative",
            "any.required": "Stock is required"
        })
});

// create product
const createProduct = async (req, res) => {
    try {
        const { title, price, category, stock } = req.body;

        // Validate body
        await productSchema.validateAsync(req.body);

        // Check image
        if (!req.file) {
            return res.status(400).json({
                status: 400,
                message: "Product image is required"
            });
        }

        // Upload image
        const buffer = req.file.buffer;
        const result = await imagekitData(buffer);

        // Create product
        const product = await Products.create({
            title,
            price,
            category,
            stock,
            image: result.url
        });

        return res.status(201).json({
            status: 201,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {

        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });

    }
};


// get all products
const allProducts = async (req, res) => {
    try {
        const product = await Products.find();

        return res.status(200).json({
            status: 200,
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
}



// get a single product
const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findById(id)

        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
}

const updateProduct = (req, res) => {
    console.log(req.params.id);
    
    res.send("product updated successfully")
}

module.exports = {
    createProduct,
    singleProduct,
    allProducts,
    updateProduct
};