const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const { email, password } = req.body;
    const text = 'SELECT password, id FROM users WHERE email = $1';
    const values = [email];

    db.query(text, values)
      .then((data) => {
        if (data.rows.length > 0) {
          if (bcrypt.compareSync(password, data.rows[0].password)) {
            req.session.user = data.rows[0].id;
          } else {
            console.log(`invalid password ${password}`);
            req.session = null;
          }
        } else {
          console.log(`No user with email ${email} was found!`);
        }
      })
      .then(() => {
        if (req.session) {
          res.redirect('/');
        } else {
          res.status(403);
        }
      })
      .catch((err) => console.log(err.stack));
  });
  return router;
};
