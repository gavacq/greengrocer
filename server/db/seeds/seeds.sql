

-- Seeds for users table

INSERT INTO users (username, email, password)
VALUES ('Andy', 'andy@mail.com', '$2b$12$aqIMGKRQkelEVgcDzR1cIOWbY/k5k/f0ju21xX2BOe8svHh8zeBSG');

INSERT INTO users (username, email, password)
VALUES ('Gary', 'gary@mail.com', '$2b$12$kxBaHkppBKYYAp6Aqrs14eZPyw.JA2zYk6R4s9ygk4sbDKuHUUaMq');

INSERT INTO users (username, email, password)
VALUES ('Nally', 'nally@mail.com', 'nopassword');

INSERT INTO users (username, email, password)
VALUES ('James', 'james@mail.com', 'nopassword');

INSERT INTO users (username, email, password)
VALUES ('Cat', 'cat@mail.com', 'nopassword');

-- Seeds for lists table

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 5);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 2);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 1);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 0);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 8);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 10);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 6);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 11);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 12);

INSERT INTO lists (user_id, co2_saved)
VALUES (2, 4);

-- Seeds for posts table

INSERT INTO posts (user_id, likes, message)
VALUES (2, 30, 'I saved 12 kg of CO2. That is like washing and drying 5 loads of laundry!');

INSERT INTO posts (user_id, likes, message)
VALUES (5, 2, 'I saved 3 kg of CO2. That is like flying in economy class for 2 minutes!');

INSERT INTO posts (user_id, likes, message)
VALUES (4, 23, 'I saved 8 kg of CO2. That is like driving 29 km in a typical passenger vehicle!');

INSERT INTO posts (user_id, likes, message)
VALUES (3, 5, 'I saved 5 kg of CO2. That is like washing and drying 3 loads of laundry!');

INSERT INTO posts (user_id, likes, message)
VALUES (5, 10, 'I saved 6 kg of CO2. That is like 36 minutes of watching Netflix in HD!');

INSERT INTO posts (user_id, likes, message)
VALUES (2, 19, 'I saved 10 kg of CO2. An average tree takes 5 months to remove that much CO2 from the atmosphere!');

INSERT INTO posts (user_id, likes, message)
VALUES (3, 14, 'I saved 8 kg of CO2. That is like driving 29 km in a typical passenger vehicle!');

INSERT INTO posts (user_id, likes, message)
VALUES (4, 18, 'I saved 6 kg of CO2. That is like 36 minutes of watching Netflix in HD!');

INSERT INTO posts (user_id, likes, message)
VALUES (2, 1, 'I saved 8 kg of CO2. That is like driving 29 km in a typical passenger vehicle!');

-- Seeds for liked posts table

INSERT INTO liked_posts (user_id, post_id)
VALUES (2, 2);

INSERT INTO liked_posts (user_id, post_id)
VALUES (2, 4);

INSERT INTO liked_posts (user_id, post_id)
VALUES (2, 5);

INSERT INTO liked_posts (user_id, post_id)
VALUES (2, 8);

INSERT INTO liked_posts (user_id, post_id)
VALUES (2, 7);

-- Seeds for products table

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (586253, 'Wild Caught Tuna Steaks, 0.65 – 0.75 lb', 'https://spoonacular.com/productImages/586253-312x231.jpeg', 22.12, 113.33, 15);

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (92875, 'Hormel Chili No Beans, 19 Ounce', 'https://spoonacular.com/productImages/92875-312x231.jpeg', 1.3, 173, 12);

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (160811, 'Utz Potato Chips The Crab Chip', 'https://spoonacular.com/productImages/160811-312x231.jpeg', 32.49, 13.07, 15);

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (36353, 'Ore-Ida Extra Crispy Fast Food French Fries Fried Potatoes Value Size, 4 lb Bag', 'https://spoonacular.com/productImages/36353-312x231.jpeg', 59.55, 10.45, 11);

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (119256, 'Cheetos Crunchy Jalapeno Flavored Snacks, 8.5oz Bags (Pack of 3)', 'https://spoonacular.com/productImages/119256-312x231.jpeg', -41.19, 174.46, 17);

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (100128, 'Dole Snack Bites Sunflower Seed Clusters, Crunchy Nut Clusters, 5 Oz Resealable Pouch', 'https://spoonacular.com/productImages/100128-312x231.png', 1.3, 173, 12);

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (115167, 'Power Crunch Protein Energy Bar Original Peanut Butter Fudge - 12 CT', 'https://spoonacular.com/productImages/115167-312x231.jpg', 43.7844, 271.2121, 4);

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (182922, 'Rosina Meatballs Homestyle, 26.0 OZ', 'https://spoonacular.com/productImages/182922-312x231.jpeg', -9.24, 147.08, 16);

INSERT INTO products (api_id, title, image, lat, long, co2)
VALUES (212062, 'Green Giant Steamers - Cheesy Rice & Broccoli', 'https://spoonacular.com/productImages/212062-312x231.jpg', 53.52, 27.3, 13);

-- Seeds for products_lists table

-- list 1
INSERT INTO products_lists (product_id, list_id, query)
VALUES (1, 1, 'tun');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (2, 1, 'bean');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (3, 1, 'chip');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (4, 1, 'fries');

-- list 2
INSERT INTO products_lists (product_id, list_id, query)
VALUES (5, 2, 'crunch');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (6, 2, 'crunchy');

-- list 3
INSERT INTO products_lists (product_id, list_id, query)
VALUES (7, 3, 'crunchy');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (8, 3, 'meatball');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (9, 3, 'broc');

-- list 4
INSERT INTO products_lists (product_id, list_id, query)
VALUES (1, 4, 'tun');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (3, 4, 'chip');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (5, 4, 'crunch');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (7, 4, 'crunchy');

-- list 5
INSERT INTO products_lists (product_id, list_id, query)
VALUES (2, 5, 'be');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (4, 5, 'fries');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (6, 5, 'crunchy');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (8, 5, 'meatball');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (9, 5, 'broc');

-- list 6
INSERT INTO products_lists (product_id, list_id, query)
VALUES (1, 6, 'tun');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (6, 6, 'crunchy');

-- list 7
INSERT INTO products_lists (product_id, list_id, query)
VALUES (2, 7, 'be');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (4, 7, 'fries');

-- list 8
INSERT INTO products_lists (product_id, list_id, query)
VALUES (8, 8, 'meatball');

-- list 9
INSERT INTO products_lists (product_id, list_id, query)
VALUES (7, 9, 'crunchy');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (8, 9, 'meatball');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (9, 9, 'broc');

-- list 10
INSERT INTO products_lists (product_id, list_id, query)
VALUES (3, 10, 'chip');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (5, 10, 'crunch');

INSERT INTO products_lists (product_id, list_id, query)
VALUES (7, 10, 'crunchy');