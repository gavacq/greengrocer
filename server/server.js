const Express = require("express");
const path = require("path");
const App = Express();
const PORT = 8081;
require("dotenv").config();
const dbParams = require("./helpers/db-params");

// PG database client/connection setup

const {Pool} = require("pg");

// create new connection pool and connect to it
const db = new Pool(dbParams);
db.connect();

// Express Configuration
App.use(Express.urlencoded({extended: false}));
App.use(Express.json());
App.use(Express.static(path.join(__dirname, "..", "build")));
App.use(Express.static("public"));

console.log("params", dbParams);

// Sample GET route
App.get("/api/data", (req, res) => {
  const queryString = "SELECT * FROM users";
  db.query(queryString).then(data => {
    return res.json({
      message: "Seems to work!",
      data: data.rows
    });
  });
});

// listen on the specified port
App.listen(PORT, () => {
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
