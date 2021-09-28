

-- Seeds for users table

INSERT INTO users (username, email, password)
VALUES ('Geecrypt', 'geecrypt@mail.com', '6253efdgy');

INSERT INTO users (username, email, password)
VALUES ('Mario', 'mario@mail.com', '87ywjh');

INSERT INTO users (username, email, password)
VALUES ('Nally', 'nally@mail.com', 'qeufhew');


-- Seeds for lists table

INSERT INTO lists (user_id, co2_data)
VALUES (1, 30);

INSERT INTO lists (user_id, co2_data)
VALUES (2, 100);

INSERT INTO lists (user_id, co2_data)
VALUES (3, 68);

-- Seeds for posts table

INSERT INTO posts (user_id, likes, message)
VALUES (1, 5, 'you saved lots of CO2');

INSERT INTO posts (user_id, likes, message)
VALUES (2, 2, 'lorem ipsum and some other stuff');

INSERT INTO posts (user_id, likes, message)
VALUES (3, 23, 'very interesting message');


-- Seeds for products table

INSERT INTO products (title, lat, long, co2_data)
VALUES ('beans', 49.1, 23.5, 103);

INSERT INTO products (title, lat, long, co2_data)
VALUES ('queso', 0, 0, 300);

INSERT INTO products (title, lat, long, co2_data)
VALUES ('tomago', 15, 30, 609);


-- Seeds for products_lists table

INSERT INTO products_lists (product_id, list_id)
VALUES (1, 1);

INSERT INTO products_lists (product_id, list_id)
VALUES (2, 1);

INSERT INTO products_lists (product_id, list_id)
VALUES (3, 3);

INSERT INTO products_lists (product_id, list_id)
VALUES (3, 1);

