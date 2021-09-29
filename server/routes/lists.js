const express = require('express');

const router = express.Router();

module.exports = () => {
  router.put('/', (req) => {
    console.log('PUT /api/lists', req.body);

    // insert multiple products

    // insert list

    // insert multiple products_lists

    // -- lists
    // user_id -> req.session
    // total c02 saved for list -> TODO
    // -- products
    // c02 for product -> y
    // lat, long -> y
    // title -> y
    // image -> y
    // api product id -> y
  });
  return router;
};
