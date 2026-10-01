const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    stock: {
        type: Number,
    },
    image: {
        url: {
            type: String,
            required: true
        },
        fileId: {
            type: String,
            required: true
        }
    }
})

const Products = mongoose.model("product", productSchema);

module.exports = Products