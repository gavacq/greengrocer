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
    const { productName } = req.query;

    // Make api calls to search for products
    searchHelper(productName)
      .then((data) => {
        const mappedPromises = data.products.map((product) => axios.get(`https://api.spoonacular.com/food/products/${product.id}?apiKey=${process.env.SPOONACULAR_API_KEY}`));

        return Promise.all(mappedPromises);
      })
      .then((response) => {
        const parsedData = response.map((r) => {
          console.log('id', r.data.id);
          return {
            id: r.data.id,
            title: r.data.title,
            image: r.data.image,
            upc: r.data.upc,
          };
        });
        console.log('This is out data: ', parsedData);
        res.send(parsedData);
      })
      .catch((error) => error.message);
  });
  return router;
};
