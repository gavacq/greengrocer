const express = require('express');
require('dotenv').config();

const router = express.Router();
const axios = require('axios');

// helper: makes the request to spoonacular API
const searchHelper = (productName) => axios.get(`https://api.spoonacular.com/food/products/search?query=${productName}&apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`)
  .then((res) => res.data)
  .catch((error) => error.message);

module.exports = () => {
  router.get('/', (req, res) => {
    console.log('params', req.query.productName);
    const { productName } = req.query;
    searchHelper(productName)
      .then((data) => res.send(data))
      .catch((error) => error.message);
  });
  return router;
};
