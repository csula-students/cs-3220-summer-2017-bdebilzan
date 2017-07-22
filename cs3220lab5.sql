CREATE TABLE food_items ( id INTEGER AUTO_INCREMENT PRIMARY KEY,
foodname VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
price DOUBLE
);

INSERT INTO food_items VALUES (1, 'Hamburger', 'A hamburger', 9.99);
select * from food_items;
INSERT INTO food_items VALUES (2, 'Fries', 'Some fries', 4.99);
INSERT INTO food_items VALUES (3, 'Coke', 'Coke cola', 2.99);
select * from food_items;
CREATE TABLE orders ( id INTEGER AUTO_INCREMENT PRIMARY KEY,
customer_name VARCHAR(255) NOT NULL,
created DATETIME
);
INSERT INTO orders VALUES (1, 'Eric', NOW());
SELECT * FROM orders;
INSERT INTO orders VALUES (2, 'John', NOW());
INSERT INTO orders VALUES (3, 'Jane', NOW());
INSERT INTO orders VALUES (4, 'ALice', NOW());
SELECT * FROM orders;
UPDATE orders SET customer_name = 'Alice' WHERE id = 4;
SELECT * FROM orders;
CREATE TABLE order_foods ( order_id INTEGER,
food_id INTEGER,
quantity_id INTEGER
);
INSERT INTO order_foods (order_id, food_id, quantity_id) VALUES (1, 1, 1), (1, 2, 2), (2, 2, 2), (2, 3, 1), (3, 3, 1), (4, 2, 1), (4, 3, 2);
select * from order_foods;
CREATE TABLE shopping_cart ( id INTEGER,
customer_name VARCHAR(255) NOT NULL,
food_id INTEGER,
quantity INTEGER
);

INSERT INTO shopping_cart VALUES (1, 'Anonymous', 1, 2);
INSERT INTO shopping_cart VALUES (1, 'Anonymous', 2, 1);
INSERT INTO shopping_cart VALUES (1, 'Anonymous', 2, 1);
INSERT INTO shopping_cart VALUES (2, 'Mike', 1, 1);
INSERT INTO shopping_cart VALUES (2, 'Mike', 2, 1);
INSERT INTO shopping_cart VALUES (3, 'Bob', 3, 1);

SELECT * FROM shopping_cart;

UPDATE food_items SET foodname = 'Salad'
WHERE foodname = 'Hamburger';

SELECT * FROM food_items;

UPDATE orders SET customer_name = 'Doe'
WHERE customer_name = 'Jane';

SELECT * FROM orders;

SELECT f.foodname, max(sum(o.quantity_id)) FROM food_items f INNER JOIN order_foods o ON f.id = o.food_id GROUP BY o.food_id;

SELECT * FROM orders;

SELECT f.foodname, sum(o.quantity_id) FROM food_items f INNER JOIN order_foods o ON f.id = o.food_id GROUP BY f.foodname;

SELECT * FROM orders WHERE created LIKE '%2017-07-22%';

DROP TABLE food_items;
DROP TABLE orders;
DROP TABLE shopping_cart;