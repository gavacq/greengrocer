const express = require('express');

const router = express.Router();

module.exports = () => {
  router.post('/', (req, res) => {
    req.session = null;
    res.json({ auth: false });
  });
  return router;
};
