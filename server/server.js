const Express = require("express");
const path = require("path");
const App = Express();
const PORT = 8081;

// PG database client/connection setup
require('dotenv').config();
const { Pool } = require('pg');
let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

console.log('dbParams', dbParams);

const db = new Pool(dbParams);
db.connect()

// Express Configuration
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.use(Express.static(path.join(__dirname, "..", "build")));
App.use(Express.static("public"));

// Sample GET route
App.get("/api/data", (req, res) => {
  const queryString = "SELECT * FROM users"
  db.query(queryString)
  .then((data) => {
    return res.json({
    message: "Seems to work!",
    data: data.rows
  })})
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
