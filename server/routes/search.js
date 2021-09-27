const express = require('express');
require('dotenv').config();

const router = express.Router();
const axios = require('axios');

// helper: makes the request to spoonacular API
const searchHelper = (productName) => axios.get(`https://api.spoonacular.com/food/products/search?query=${productName}&apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true&number=3`)
  .then((res) => res.data)
  .catch((error) => error.message);

module.exports = () => {
  // Initialize router for get /api/search
  router.get('/', (req, res) => {
    // console.log('params', req.query.productName);
    const { productName } = req.query;

    // Make api calls to search for products
    searchHelper(productName)
      .then((data) => {
        // console.log('THIS IS THE DATA FOR 2ND AXIOS REQUEST : ', data.products);
        const newData = [];
        data.products.forEach((product) => {
          // console.log("INDIVIDUAL PRODUC :", product);
          axios.get(`https://api.spoonacular.com/food/products/${product.id}?apiKey=${process.env.SPOONACULAR_API_KEY}`)
            .then((response) => {
              // console.log('THIS IS THE RESPONSE FROM THE 2ND AXIOS REQUEST: ', response.data);
              const newProduct = {
                id: response.data.id,
                title: response.data.title,
                image: response.data.image,
                upc: response.data.upc,
              };
              console.log('FANCY NEW PRODUCT : ', newProduct);
              newData.push(newProduct);
            });
        });
      })
      .catch((error) => error.message);
  });
  return router;
};
