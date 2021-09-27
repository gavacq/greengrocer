const express = require('express');
const path = require('path');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./helpers/db-params');

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

// Bring in External Routes
const { searchRoute, newList } = require('./routes/index');

// External Routes
app.use('/api/search', searchRoute());
app.use('/api/lists/new', newList());

// listen on the specified port
app.listen(PORT, () => {
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`,
  );
});
