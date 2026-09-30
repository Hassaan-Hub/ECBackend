const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
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
        type: String,
    },
})

const Products = mongoose.model("product", productSchema);

module.exports = Products