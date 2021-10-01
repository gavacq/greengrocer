/* eslint-disable no-restricted-syntax */
const express = require('express');

const router = express.Router();

module.exports = (db) => {
  // PUT
  router.put('/', (req, res) => {
    const { list } = req.body;
    if (!list.products.length) {
      res.send('empty products list');
      return;
    }
    console.log('PUT /api/lists', req.body);

    const productsValuesSql = list.products.map((p) => `(${p.api_id}, '${p.title}', '${p.image}', ${p.lat}, ${p.long}, ${p.co2})`);
    // TODO: fix SQL injection vulnerabilities
    const productsSql = `INSERT INTO products(api_product_id, title, image, lat, long, co2_data) VALUES ${productsValuesSql} ON CONFLICT (api_product_id) DO UPDATE SET api_product_id=EXCLUDED.api_product_id RETURNING id, api_product_id`;
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

    const listsSql = `INSERT INTO lists(user_id, co2_saved) VALUES (${req.session.user}, ${req.body.list.co2_saved}) RETURNING id`;
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
        console.log('THIS IS PROMISE DATA: ', data);
        if (!data[0].length) {
          return Promise.resolve();
        }
        console.log('promise.all', req.body.list);
        // eslint-disable-next-line max-len
        const getQueryFromApiProductId = (apiProductId) => {
          const str = list.products.find((p) => p.api_id === apiProductId);
          console.log('querystr', str.query);
          return str.query;
        };

        const productsListsValuesSql = data[0].map((p) => `(${p.id}, ${data[1][0].id}, '${getQueryFromApiProductId(p.api_product_id)}')`);
        console.log('sql', productsListsValuesSql);
        return db.query(`INSERT INTO products_lists(product_id, list_id, query) VALUES ${productsListsValuesSql}`);
      })
      .then(() => {
        res.send('saved');
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
        console.log(l.list_id);
        const product = {
          api_id: l.api_product_id,
          title: l.title,
          image: l.image,
          co2: l.co2_data,
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
        console.log('initial results: ', results.rows);
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
    console.log('This is the response list data: ', req.params.listId);
    db.query(`
    DELETE
    FROM lists
    WHERE id = $1
    RETURNING id
    `, [req.params.listId])
      .then((data) => {
        res.json({ deleted: data.rows });
      })
      .catch((err) => {
        console.log('delete error', err);
        res.json({ deleted: false });
      });
  });

  return router;
};
