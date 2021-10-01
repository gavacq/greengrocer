const express = require('express');

const router = express.Router();

module.exports = (db) => {
  router.get('/', (res, req) => {
    const allProductsQuery = `
        SELECT lat, long
        FROM products
      `;
    db.query(allProductsQuery)
      .then((results) => {
          console.log(results);
      });
  });
  return router;
};
