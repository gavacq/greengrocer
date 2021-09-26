const express = require('express');
const path = require('path');


// PG database client/connection setup
require('dotenv').config();
const { Pool } = require('pg');
const dbParams = require('./helpers/db-params');
const {searchRoute} = require('./routes/index');

// create new connection pool and connect to it
const db = new Pool(dbParams);
db.connect();

// Express Configuration
const app = express();
const PORT = 8081;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

// Sample GET route
app.get('/api/data', (req, res) => {
  const queryString = 'SELECT * FROM users';
  db.query(queryString).then((data) => res.json({
    message: 'Seems to work!',
    data: data.rows,
  }));
});

app.use('/api/search', searchRoute());

// listen on the specified port
app.listen(PORT, () => {
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`,
  );
});
