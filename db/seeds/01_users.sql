

-- Seeds for users table

INSERT INTO users (username, email, password)
VALUES ('Geecrypt', 'geecrypt@mail.com', '6253efdgy');

INSERT INTO users (username, email, password)
VALUES ('Mario', 'mario@mail.com', '87ywjh');

INSERT INTO users (username, email, password)
VALUES ('Nally', 'nally@mail.com', 'qeufhew');


-- ALTER SEQUENCE users_id_seq RESTART WITH 4;


-- Seeds for lists table

INSERT INTO lists (co2_data)
VALUES (30)

INSERT INTO lists (co2_data)
VALUES (100)

INSERT INTO lists (co2_data)
VALUES (68)


-- Seeds for posts table

INSERT INTO posts (likes, message)
VALUES (5, 'you saved lots of CO2')

INSERT INTO posts (likes, message)
VALUES (2, 'lorem ipsum and some other stuff')

INSERT INTO posts (likes, message)
VALUES (23, 'very interesting message')


-- Seeds for products table

INSERT INTO products (lat, long, co2_data)
VALUES (49.1, 23.5, 103)

INSERT INTO products (lat, long, co2_data)
VALUES (0, 0, 300)

INSERT INTO products (lat, long, co2_data)
VALUES (15, 30, 609)