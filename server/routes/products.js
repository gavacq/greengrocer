const express = require('express');

const router = express.Router();

module.exports = (db) => {
  router.get('/', (res) => {
    const allProductsQuery = `
        SELECT lat, long
        FROM products
      `;
    db.query(allProductsQuery)
      .then((results) => {
        console.log(results);
        res.json(results);
      })
      .catch((e) => {
        console.log('Error: GET /products', e);
        res.json({});
      });
  });
  return router;
};
