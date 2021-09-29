const express = require('express');

const router = express.Router();

module.exports = () => {
  router.put('/', (req, res) => {
    console.log(req.body);
    res.send();
  });
  return router;
};
