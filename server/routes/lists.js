const express = require('express');

const router = express.Router();

module.exports = (db) => {
  router.put('/', (req, res) => {
    const products = req.body.newList;
    if (!products.length) {
      res.send('empty products list');
      return;
    }
    console.log('PUT /api/lists', req.body);

    const productsValuesSql = products.map((p) => `(${p.api_id}, '${p.title}', '${p.image}', ${p.lat}, ${p.long}, ${p.co2})`);
    // TODO: fix SQL injection vulnerabilities
    const productsSql = `INSERT INTO products(api_product_id, title, image, lat, long, co2_data) VALUES ${productsValuesSql} ON CONFLICT (api_product_id) DO UPDATE SET api_product_id=EXCLUDED.api_product_id RETURNING id`;
    console.log(productsSql);
    // insert multiple products
    // check api_id column for conflicts, if so do nothing
    const productsPromise = db.query(productsSql)
      .then((data) => {
        console.log('products insert success!', data.rows);
        // OK, all records have been inserted
        return data.rows;
      })
      .catch((error) => {
        console.log(error);
      });

    // insert list

    const listsSql = `INSERT INTO lists(user_id, co2_saved) VALUES (${req.session.user}, ${req.body.cO2Saved}) RETURNING id`;
    const listsPromise = db.query(listsSql)
      .then((data) => {
        console.log('second success');
        return data.rows;
      })
      .catch((error) => {
        console.log(error);
      });

    // insert multiple products_lists, wait for productsPromise and listsPromise to resolve first
    Promise.all([productsPromise, listsPromise])
      .then((data) => {
        console.log('This is promise data: ', data);
        if (!data[0].length) {
          console.log('no products to insert');

          return Promise.resolve();
        }
        const productsListsValuesSql = data[0].map((p) => `(${p.id}, ${data[1][0].id})`);
        console.log('sql', productsListsValuesSql);
        return db.query(`INSERT INTO products_lists(product_id, list_id) VALUES ${productsListsValuesSql}`);
      })
      .then(() => {
        console.log('successfully insert products_lists');
        res.send('saved');
      })
      .catch((error) => console.log('products_lists insert failed', error));
  });
  return router;
};
