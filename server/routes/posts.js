const express = require('express');

const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const text = 'SELECT (posts.*), (users.username) FROM posts JOIN users ON users.id = user_id';
    db.query(text)
      .then((data) => {
        console.log(data.rows);
        res.json(data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.json({});
      });
  });

  router.patch('/', (req, res));
  return router;
};
