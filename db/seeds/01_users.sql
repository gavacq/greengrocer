

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

INSERT INTO products (lat, long, co2_data)
VALUES (49.1, 23.5, 103);

INSERT INTO products (lat, long, co2_data)
VALUES (0, 0, 300);

INSERT INTO products (lat, long, co2_data)
VALUES (15, 30, 609);


