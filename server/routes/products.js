const express = require('express');

const router = express.Router();

module.exports = (db) => {
<<<<<<< HEAD
  router.get('/', (res, req) => {
=======
  router.get('/', (res) => {
>>>>>>> ed2a2e9965a0864a0af034865970465830530b47
    const allProductsQuery = `
        SELECT lat, long
        FROM products
      `;
    db.query(allProductsQuery)
      .then((results) => {
<<<<<<< HEAD
          console.log(results);
=======
        console.log(results);
        res.json(results);
>>>>>>> ed2a2e9965a0864a0af034865970465830530b47
      });
  });
  return router;
};
