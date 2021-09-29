DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS liked_posts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS products_lists CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(60) NOT NULL,
  datetime TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE lists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date_created TIMESTAMP NOT NULL DEFAULT NOW(), 
  co2_saved FLOAT NOT NULL
);


CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  likes INTEGER NOT NULL,
  message VARCHAR(255) NOT NULL
);

CREATE TABLE liked_posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) on DELETE CASCADE
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  api_product_id INTEGER UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  lat FLOAT NOT NULL,
  long FLOAT NOT NULL, 
  co2_data FLOAT NOT NULL
);


CREATE TABLE products_lists (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE
);

