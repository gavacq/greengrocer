const express = require('express');

const router = express.Router();

module.exports = () => {
  router.post('/', (req) => {
    console.log('body', req.body);
  });
  return router;
};
