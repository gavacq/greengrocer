/* eslint-disable no-restricted-syntax */
const express = require('express');

const router = express.Router();

module.exports = (db) => {
  // PUT
  router.put('/', (req, res) => {
    const { list } = req.body;
    if (!req.session || !req.session.user || !list.products.length) {
      res.json({ products: [] });
      return;
    }
    console.log('PUT /api/lists', req.body);
    console.log('products', list.products[0]);

    const productsValuesSql = list.products.map((p) => `(${p.api_id}, '${p.title}', '${p.image}', ${p.lat}, ${p.long}, ${p.co2})`);
    // TODO: fix SQL injection vulnerabilities
    const productsSql = `INSERT INTO products(api_id, title, image, lat, long, co2) VALUES ${productsValuesSql} ON CONFLICT (api_id) DO UPDATE SET api_id=EXCLUDED.api_id RETURNING *`;
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

    const listsSql = `INSERT INTO lists(user_id, co2_saved) VALUES (${req.session.user}, ${req.body.list.co2_saved}) RETURNING *`;
    const listsPromise = db.query(listsSql)
      .then((data) => data.rows)
      .catch((error) => {
        console.log(error);
      });

    // insert multiple products_lists, wait for productsPromise and listsPromise to resolve first
    Promise.all([productsPromise, listsPromise])
      .then((data) => {
        if (!data[0].length) {
          return Promise.resolve();
        }
        const getQueryFromApiProductId = (apiProductId) => {
          const str = list.products.find((p) => p.api_id === apiProductId);
          return str.query;
        };

        const productsListsValuesSql = data[0].map((p) => `(${p.id}, ${data[1][0].id}, '${getQueryFromApiProductId(p.api_id)}')`);
        console.log('sql', productsListsValuesSql);
        return Promise.all([data, db.query(`INSERT INTO products_lists(product_id, list_id, query) VALUES ${productsListsValuesSql} RETURNING query`)]);
      })
      .then((data) => {
        console.log('productsLists insert return ', data[1].rows);
        const queries = data[1].rows;
        const productData = data[0][0];
        const listData = data[0][1][0];
        productData.forEach((p, i) => {
          const newProduct = { ...p, query: queries[i].query };
          if (!listData.products) {
            listData.products = [newProduct];
          } else {
            listData.products.push(newProduct);
          }
        });
        delete listData.user_id;
        console.log('formatted', listData);

        // return formatted list
        res.json(listData);
      })
      .catch((error) => console.log('products_lists insert failed', error));
  });

  // GET
  router.get('/', (req, res) => {
    const loadListsQuery = `
      SELECT lists.*, lists.id as list_id, products.*, products.id as product_id, products_lists.query
      FROM lists
      JOIN products_lists ON products_lists.list_id = lists.id
      JOIN users ON users.id = lists.user_id
      JOIN products ON products.id = products_lists.product_id
      WHERE users.id = $1;
      `;

    const formatLists = (unformatted) => {
      const formatted = unformatted.reduce((acc, l) => {
        const product = {
          api_id: l.api_id,
          title: l.title,
          image: l.image,
          co2: l.co2,
          lat: l.lat,
          long: l.long,
          query: l.query,
        };

        if (!acc[l.list_id]) {
          acc[l.list_id] = {
            id: l.list_id,
            dateCreated: l.date_created,
            co2_saved: l.co2_saved,
            products: [product],
          };
        } else {
          acc[l.list_id].products.push(product);
        }

        return acc;
      }, {});

      return Object.keys(formatted).map((k) => formatted[k]);
    };

    db.query(loadListsQuery, [req.session.user])
      .then((results) => {
        const formattedLists = formatLists(results.rows);
        return res.status(200).send({
          results: formattedLists,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.delete('/:listId', (req, res) => {
    db.query(`
    DELETE
    FROM lists
    WHERE id = $1
    RETURNING id
    `, [req.params.listId])
      .then((data) => {
        res.json({ deleted: data.rows });
      })
      .catch(() => {
        res.json({ deleted: false });
      });
  });

  router.get('/products', (req, res) => {
    const allProductsQuery = `
        SELECT lat, long
        FROM products
        JOIN products_lists ON products_lists.product_id = products.id
        JOIN lists ON products_lists.list_id = lists.id
        JOIN users ON users.id = lists.user_id
        WHERE users.id = $1;
      `;
    db.query(allProductsQuery, [req.session.user])
      .then((results) => {
        res.send({ results });
      });
  });

  return router;
};
