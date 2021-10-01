const express = require('express');

const router = express.Router();

module.exports = () => {
    router.get('/', () => {
        const allProductsQuery = `
        SELECT lat, long
        FROM products
        `
        
    })
}