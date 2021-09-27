// TO RESET THE DATABASE: npm run db:reset from the root directory

const path = require('path');

// load .env data into process.env

// specify path to the .env file since it is not in the root directory
const dotenvPath = path.join(__dirname, '..', '.env');
require('dotenv').config({ path: dotenvPath });

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const { Pool } = require('pg');
const dbParams = require('../helpers/db-params');

// PG connection setup
const db = new Pool(dbParams);
db.connect();

let sql = fs.readFileSync('./db/schema/schema.sql', 'utf8');
db.query(sql)
  .then(() => {
    sql = fs.readFileSync('./db/seeds/seeds.sql', 'utf8');
    return db.query(sql);
  })
  .then(() => {
    console.log(chalk.green('success!'));
    process.exit(0);
  })
  // eslint-disable-next-line no-console
  .catch((err) => {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit(1);
  });
