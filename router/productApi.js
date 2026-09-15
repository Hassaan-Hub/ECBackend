const express = require('express');

const productRouter = express.Router();

productRouter.use(express.json())

const products = [
    { "id": 1, "name": "Laptop", "price": 1000, "category": "Electronics" },
    { "id": 2, "name": "Smartphone", "price": 500, "category": "Electronics" },
    { "id": 3, "name": "Headphones", "price": 100, "category": "Electronics" },
    { "id": 4, "name": "Shoes", "price": 80, "category": "Fashion" },
    { "id": 5, "name": "T-shirt", "price": 20, "category": "Fashion" }
]


productRouter.get('/', (req, res) => {
    console.log(products);

    res.status(200).json({
        message: "products get successfully",
        productData: products
    })
})


productRouter.get('/:id', (req, res) => {
    const indexId = parseInt(req.params.id);
    const product = products.find(u => u.id === indexId)

    if (!product) {
        return res.status(404).json({
            message: "product not found"
        })
    }

    res.status(200).json({
        message: "product get successfully",
        product: product
    })
})


productRouter.post('/', (req, res) => {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(404).json({
            message: "Name Price Category are required"
        })
    }

    const newProduct = { id: products.length + 1, name, price, category }
    products.push(newProduct)

    res.status(201).json({
        message: "product added successfully"
    })
})


productRouter.put('/:id', (req, res) => {
    const indexId = parseInt(req.params.id);
    const upProd = products.find(u => u.id === indexId);

    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(404).json({
            message: "Name Price Category are required"
        })
    }

    upProd.name = name
    upProd.price = price
    upProd.category = category

    res.status(200).json({
        message: "product updated successfully",
        product: upProd
    })
})


productRouter.delete('/:id', (req, res) => {
    const indexId = parseInt(req.params.id);
    const delProd = products.find(u => u.id === indexId);

    if (!delProd) {
        return res.status(404).json({
            message: "product not found"
        })
    }
    products.splice(products.indexOf(delProd), 1);

    res.status(200).json({
        message: "product deleted successfully"
    })
})

module.exports = productRouter;