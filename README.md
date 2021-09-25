# greengrocer
Track your groceries' carbon footprint.

## project setup
1. run `npm install` in the root directory AND in the server directory

## linting setup
Following Airbnb's react style guide:
- https://www.npmjs.com/package/eslint-config-airbnb
- https://medium.com/@Tunmise/set-up-eslint-with-airbnb-style-guide-in-5-minutes-d7b4cc5707f8
- https://github.com/airbnb/javascript

## database setup
1. with postgreSQL set up, create a database called greengrocer
2. open postgreSQL interactive terminal (psql) inside the project's root directory
3. run `\i db/schema/schema.sql` to create the tables 
4. run `\i db/seeds/01_users.sql` to seed the database
5. create a .env file inside the server directory and fill in the required fields
```
DB_HOST=hostname
DB_USER=username
DB_PASS=password
DB_NAME=databasename
DB_PORT=portnumber
```

## running the app in development mode
1. from the root directory: `npm run start-client`
2. from the server directory: `npm run start`

## running the app in production mode
1. from the root directory: `npm run start`

