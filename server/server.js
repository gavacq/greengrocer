const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./helpers/db-params');
const { searchRoute, loginRoute } = require('./routes/index');

// create new connection pool and connect to it
const db = new Pool(dbParams);
db.connect();

// Express Configuration
const app = express();
const PORT = 8081;
app.use(morgan('dev'));
// Keys are 256 bits of random data from crypto.randomBytes
const key1 = 'f83f6a3696bc184779bdc3c7aded56196cf107982770518a53bf7dea7736fc2dc3a3d312e4de519ccf82adf8f194c2d15307cc4efe7a426039bf564a31c93ade';
const key2 = '7feafc0683e7da49fc2405d1990ddd4d08e0623d6aca13bb48dd76ef891d12cfda7eb26f78a1820981f34b70da5b8ce2cf416000bc730ea379951d47744f0398';
const key3 = '2da54d8184202d1915ab33f10d5557f1a764847dc2d8feb8f98a4dc8d6fae216bcbe12c1ab2d33ca68d881e3ca66283d0a64861c3f62a4bbb26ae000ccd51b44';
app.use(cookieSession({
  name: 'session',
  keys: [key1, key2, key3],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
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
app.use('/login', loginRoute());

// listen on the specified port
app.listen(PORT, () => {
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`,
  );
});
