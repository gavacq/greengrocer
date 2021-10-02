const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
require('dotenv').config();
// socket.io
const { createServer } = require('http');
const { Server } = require('socket.io');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./helpers/db-params');

// create new connection pool and connect to it
const db = new Pool(dbParams);
db.connect();

// Express Configuration
const app = express();
const PORT = 8081;
app.use(morgan('dev'));
// Keys are 256 bits of random data from crypto.randomBytes
const key1 = process.env.COOKIE_KEY1;
const key2 = process.env.COOKIE_KEY2;
const key3 = process.env.COOKIE_KEY3;
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

// Bring in External Routes
const {
  searchRoute, listsRoute, loginRoute, logoutRoute, postsRoute, productsRoute,
} = require('./routes/index');

// External Routes
app.use('/login', loginRoute(db));
app.use('/logout', logoutRoute());
app.use('/api/search', searchRoute());
app.use('/api/lists', listsRoute(db));
app.use('/api/products', productsRoute(db));
app.use('/api/posts', postsRoute(db));

// initialize socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on('connection', (socket) => {
  console.log('User Connected');

  socket.on('Disconnect', () => {
    console.log('User Disconnected');
  });
});

httpServer.listen(8082);

// listen on the specified port
app.listen(PORT, () => {
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`,
  );
});
