const express = require('express');

const router = express.Router();

module.exports = () => {
  router.post('/', (req) => {
    req.session = null;
  });
  return router;
};
