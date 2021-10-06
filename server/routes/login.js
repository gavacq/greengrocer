const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const { email, password } = req.body;
    const text = 'SELECT password, id, username FROM users WHERE email = $1';
    const values = [email];

    db.query(text, values)
      .then((data) => {
        if (data.rows.length > 0) {
          if (bcrypt.compareSync(password, data.rows[0].password)) {
            req.session.user = data.rows[0].id;
            res.json({ auth: true, username: data.rows[0].username });
          } else {
            // console.log(`invalid password ${password}`);
            throw new Error('invalid password');
          }
        } else {
          // console.log(`No user with email ${email} was found!`);

          throw new Error(`no user with email ${email} was found`);
        }
      })
      .catch((err) => {
        req.session = null;
        res.json({ auth: false });
        console.log(err);
      });
  });

  router.get('/', (req, res) => {
    if (!req.session || !req.session.user) {
      res.json({ auth: false });
    } else {
      const text = 'SELECT username FROM users WHERE id = $1';
      const values = [req.session.user];
      db.query(text, values)
        .then((data) => {
          res.json({ auth: true, username: data.rows[0].username });
        });
    }
  });
  return router;
};
