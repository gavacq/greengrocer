const Express = require("express");
const path = require("path");
const App = Express();
const PORT = 8081;

// Postgres config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");

// Express Configuration
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.use(Express.static(path.join(__dirname, "..", "build")));
App.use(Express.static("public"));

// Sample GET route
App.get("/api/data", (req, res) =>
  res.json({
    message: "Seems to work!"
  })
);

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
