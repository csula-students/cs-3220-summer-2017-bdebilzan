CREATE TABLE food_items ( id INTEGER AUTO_INCREMENT PRIMARY KEY,
foodname VARCHAR(255) NOT NULL,
description VARCHAR(255) NOT NULL,
price DOUBLE
);

INSERT INTO food_items VALUES (1, 'Ginger Sesame Glazed Salmon', 'The salmon is sliced and marinated, then cooked in sesame oil. Served with sauce on the side and chopped fresh cilantro sprinkled on top. Garnished with black sesame seeds.', 20.00);
select * from food_items;
INSERT INTO food_items VALUES (2, 'Hasselback Marinara Chicken', 'The chicken breasts are sliced accordion style and stuffed with spinach and cheeses. Topped with tomato sauce and mozzarella.', 18.00);
INSERT INTO food_items VALUES (3, 'Nacho Steak Skillet', 'This nacho steak skillet features roasted cauliflower, thin sliced steak, cheese, and lots of fun nacho toppings.', 16.00);
					
SELECT * FROM food_items;

UPDATE food_items SET description = 'This nacho steak skillet features roasted cauliflower, thin sliced steak, cheese, and lots of fun nacho toppings.'
WHERE foodname = 'Nacho Steak Skillet';

SELECT * FROM food_items;

SELECT * FROM food_items;

ALTER TABLE food_items ADD imageurl VARCHAR(500) NOT NULL;

DELETE FROM food_items;

SELECT * FROM food_items;


INSERT INTO food_items (foodname, description, price, imageurl) VALUES ('Ginger Sesame Glazed Salmon', 'The salmon is sliced and marinated, then cooked in sesame oil. Served with sauce on the side and chopped fresh cilantro sprinkled on top. Garnished with black sesame seeds.', 20.00, 'https://cdn4.ruled.me/wp-content/uploads/2014/05/SoySearedSalmon.jpg'),
('Hasselback Marinara Chicken', 'The chicken breasts are sliced accordion style and stuffed with spinach and cheeses. Topped with tomato sauce and mozzarella.', 18.00, 'https://cdn4.ruled.me/wp-content/uploads/2017/03/IMG_1166.jpg'),
('Nacho Steak Skillet', 'This nacho steak skillet features roasted cauliflower, thin sliced steak, cheese, and lots of fun nacho toppings.', 16.00, 'https://cdn4.ruled.me/wp-content/uploads/2017/05/featured1.jpg');

SELECT * FROM food_items;

SELECT * FROM food_items;

SELECT * FROM food_items;

SELECT * FROM food_items;
