const express = require('express');

const router = express.Router();

module.exports = () => {
  router.put('/', (req) => {
    console.log('PUT /api/lists', req.body);
    // -- lists
    // user_id
    // total c02 saved for list
    // -- products
    // c02 for product
    // lat, long
    // title
    // image
  });
  return router;
};
