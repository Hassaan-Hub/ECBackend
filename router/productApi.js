const express = require('express');

const productRouter = express.Router();

productRouter.use(express.json())

const products = [
    {"id":1, "name":"Laptop", "price": 1000, "category": "Electronics"},
    {"id":2, "name":"Smartphone", "price": 500, "category": "Electronics"},
    {"id":3, "name":"Headphones", "price": 100, "category": "Electronics"},
    {"id":4, "name":"Shoes", "price": 80, "category": "Fashion"},
    {"id":5, "name":"T-shirt", "price": 20, "category": "Fashion"}
]