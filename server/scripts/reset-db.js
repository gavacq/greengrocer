// TO RESET THE DATABASE: npm run db:reset from the root directory

const path = require('path');

// load .env data into process.env

// specify path to the .env file since it is not in the root directory
const dotenvPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: dotenvPath });

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const Client = require('pg-native');

// PG connection setup
const connectionString = process.env.DATABASE_URL
  || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = () => {
  // eslint-disable-next-line no-console
  console.log(chalk.cyan('-> Loading Schema Files ...'));
  const schemaFilenames = fs.readdirSync('./server/db/schema');
  schemaFilenames.forEach((fn) => {
    const sql = fs.readFileSync(`./server/db/schema/${fn}`, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`\t-> Running ${chalk.green(fn)}`);
    client.querySync(sql);
  });
};

const runSeedFiles = () => {
  // eslint-disable-next-line no-console
  console.log(chalk.cyan('-> Loading Seeds ...'));
  const schemaFilenames = fs.readdirSync('./server/db/seeds');

  schemaFilenames.forEach((fn) => {
    const sql = fs.readFileSync(`./server/db/seeds/${fn}`, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`\t-> Running ${chalk.green(fn)}`);
    client.querySync(sql);
  });
};

try {
  // eslint-disable-next-line no-console
  console.log(`-> Connecting to PG using ${connectionString} ...`);
  client.connectSync(connectionString);
  runSchemaFiles();
  runSeedFiles();
  client.end();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(chalk.red(`Failed due to error: ${err}`));
  client.end();
}
