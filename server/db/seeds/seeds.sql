

-- Seeds for users table

INSERT INTO users (username, email, password)
VALUES ('Andy', 'andy@mail.com', '$2b$12$aqIMGKRQkelEVgcDzR1cIOWbY/k5k/f0ju21xX2BOe8svHh8zeBSG');

INSERT INTO users (username, email, password)
VALUES ('Gary', 'gary@mail.com', '$2b$12$kxBaHkppBKYYAp6Aqrs14eZPyw.JA2zYk6R4s9ygk4sbDKuHUUaMq');

INSERT INTO users (username, email, password)
VALUES ('Nally', 'nally@mail.com', 'qeufhew');


-- Seeds for lists table

INSERT INTO lists (user_id, co2_saved)
VALUES (1, 30);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 100);

INSERT INTO lists (user_id, co2_saved)
VALUES (3, 68);

-- Seeds for posts table

INSERT INTO posts (user_id, likes, message)
VALUES (1, 5, 'you saved lots of CO2');

INSERT INTO posts (user_id, likes, message)
VALUES (2, 2, 'lorem ipsum and some other stuff');

INSERT INTO posts (user_id, likes, message)
VALUES (3, 23, 'very interesting message');

-- Seeds for liked posts table

INSERT INTO liked_posts (user_id, post_id)
VALUES (2, 1);

INSERT INTO liked_posts (user_id, post_id)
VALUES (2, 2);

INSERT INTO liked_posts (user_id, post_id)
VALUES (1, 3);


-- Seeds for products table

INSERT INTO products (api_product_id, title, lat, long, co2_data)
VALUES (12, 'beans', 49.1, 23.5, 103);

INSERT INTO products (api_product_id, title, lat, long, co2_data)
VALUES (123, 'queso', 0, 0, 300);

INSERT INTO products (api_product_id, title, lat, long, co2_data)
VALUES (13, 'tomago', 15, 30, 609);


-- Seeds for products_lists table

INSERT INTO products_lists (product_id, list_id)
VALUES (1, 1);

INSERT INTO products_lists (product_id, list_id)
VALUES (2, 1);

INSERT INTO products_lists (product_id, list_id)
VALUES (3, 3);

INSERT INTO products_lists (product_id, list_id)
VALUES (3, 1);
