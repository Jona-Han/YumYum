-- Drop Table Statements

DROP TABLE USER_REACTIONS;
DROP TABLE MEDIA_IN_RECIPES;
DROP TABLE MEDIA_IN_POSTS;
DROP TABLE RECIPE_IN_POST;
DROP TABLE RECIPE_CATEGORY;
DROP TABLE RECIPE_INGREDIENTS;
DROP TABLE STEPS;
DROP TABLE FOLLOWS;
DROP TABLE USER_NOTIFICATIONS;
DROP TABLE POSTS;
DROP TABLE REVIEWS;
DROP TABLE RECIPES;
DROP TABLE INGREDIENTS;
DROP TABLE CATEGORIES;
DROP TABLE USERS;


-- Table Creation Statements

CREATE TABLE USERS (
    id VARCHAR(40) PRIMARY KEY,
    given_Name VARCHAR(50) NOT NULL,
    family_Name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    number_Of_Posts INT DEFAULT 0,
    number_Of_Followers INT DEFAULT 0,
    number_Following INT DEFAULT 0
);

CREATE TABLE RECIPES (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(64),
    prep_Time INT,
    cook_Time INT,
    servings INT,
    rating REAL,
    num_Of_Reviews INT DEFAULT 0,
    calories INT,
    fat INT,
    protein INT,
    carb INT
);

CREATE TABLE MEDIA_IN_RECIPES (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipe_ID INT NOT NULL,
    FOREIGN KEY (recipe_ID) REFERENCES RECIPES (id)
);

CREATE TABLE POSTS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content VARCHAR(4096),
    category INT,
    date_Created DATE DEFAULT CURRENT_DATE,
    num_Of_Reactions INT DEFAULT 0,
    user_ID VARCHAR(40) NOT NULL,
    FOREIGN KEY (user_ID) REFERENCES USERS (id)
);

CREATE TABLE MEDIA_IN_POSTS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_ID INT NOT NULL,
    FOREIGN KEY (post_ID) REFERENCES POSTS (id)

);

CREATE TABLE RECIPE_IN_POST (
    post_ID INT,
    recipe_ID INT,
    PRIMARY KEY(post_ID, recipe_ID),
    FOREIGN KEY (post_ID) REFERENCES POSTS (id),
    FOREIGN KEY (recipe_ID) REFERENCES RECIPES (id)
);

CREATE TABLE REVIEWS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content VARCHAR(4096),
    rating REAL,
    date_Created DATE DEFAULT CURRENT_DATE,
    user_ID VARCHAR(40),
    recipe_ID INT,
    FOREIGN KEY (user_ID) REFERENCES USERS (id),
    FOREIGN KEY (recipe_ID) REFERENCES RECIPES (id)
);

CREATE TABLE INGREDIENTS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(128),
    quantity INT NOT NULL,
    quantifier VARCHAR(32)
);

CREATE TABLE RECIPE_INGREDIENTS (
    recipe_ID INT,
    ingredient_ID INT,
    PRIMARY KEY(recipe_ID, ingredient_ID),
    FOREIGN KEY (recipe_ID) REFERENCES RECIPES (ID),
    FOREIGN KEY (ingredient_ID) REFERENCES INGREDIENTS (ID)
);

CREATE TABLE USER_NOTIFICATIONS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message VARCHAR(512),
    user_ID VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_ID) REFERENCES USERS (ID)
);

CREATE TABLE USER_REACTIONS (
    user_ID VARCHAR(40),
    post_ID INT,
    type INT NOT NULL,
    PRIMARY KEY(user_ID, post_ID),
    FOREIGN KEY (user_ID) REFERENCES USERS (ID),
    FOREIGN KEY (post_ID) REFERENCES POSTS (ID)
);

CREATE TABLE FOLLOWS (
    user_ID1 VARCHAR(40),
    user_ID2 VARCHAR(40),
    PRIMARY KEY(user_ID1, user_ID2),
    FOREIGN KEY (user_ID1) REFERENCES USERS (ID),
    FOREIGN KEY (user_ID2) REFERENCES USERS (ID)
);

CREATE TABLE STEPS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content VARCHAR(1024),
    number_order INT,
    recipe_ID INT NOT NULL,
    FOREIGN KEY (recipe_ID) REFERENCES RECIPES (ID)
);

CREATE TABLE CATEGORIES (
    name VARCHAR(32) PRIMARY KEY DEFAULT 'Uncategorized'
);

CREATE TABLE RECIPE_CATEGORY (
    recipe_ID INT,
    category_name VARCHAR(32),
    PRIMARY KEY(recipe_ID, category_Name),
    FOREIGN KEY (recipe_ID) REFERENCES RECIPES (ID),
    FOREIGN KEY (category_Name) REFERENCES CATEGORIES (name)
);

-- Triggers
CREATE OR REPLACE FUNCTION update_reviews_and_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the total number of reviews
    UPDATE RECIPES 
    SET num_Of_Reviews = num_Of_Reviews + 1
    WHERE id = NEW.recipe_ID;

    -- Update the rating
    UPDATE RECIPES
    SET rating = (
        SELECT (SUM(rating) / COUNT(*))
        FROM REVIEWS 
        WHERE recipe_ID = NEW.recipe_ID
    )
    WHERE id = NEW.recipe_ID;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tr_update_reviews_and_rating 
AFTER INSERT ON REVIEWS
FOR EACH ROW 
EXECUTE FUNCTION update_reviews_and_rating();


-- Insert Statements
INSERT INTO USERS (id, given_name, family_name, email) VALUES ('1', 'Cloud', 'Strife', 'cstrife@gmail.com');
INSERT INTO USERS (id, given_name, family_name, email) VALUES ('2', 'Tifa', 'Lockhart', 'tlockhart@gmail.com');
INSERT INTO USERS (id, given_name, family_name, email) VALUES ('3', 'Aerith', 'Gainsborough', 'aerith@gmail.com');
INSERT INTO USERS (id, given_name, family_name, email) VALUES ('4', 'Barrett', 'Wallace', 'bwallace@gmail.com');
INSERT INTO USERS (id, given_name, family_name, email) VALUES ('5', 'Yuffie', 'Kisaragi', 'yuffie@gmail.com');
INSERT INTO USERS (id, given_name, family_name, email) VALUES ('auth0|64e31d02ef2059e5d69f6e23', 'Jonathan', 'Han', 'hanxiaohoo300@gmail.com');

INSERT INTO RECIPES (name, prep_Time, cook_Time, servings, calories, fat, protein, carb)
VALUES ('Hamburger',15, 15, 2, 800, 20, 20, 60);
INSERT INTO RECIPES (name, prep_Time, cook_Time, servings, calories, fat, protein, carb)
VALUES ('Cheeseburger',15, 15, 2, 640, 20, 14, 60);
INSERT INTO RECIPES (name, prep_Time, cook_Time, servings, calories, fat, protein, carb)
VALUES ('Spaghetti',15, 20, 2, 800, 20, 20, 60);
INSERT INTO RECIPES (name, prep_Time, cook_Time, servings, calories, fat, protein, carb)
VALUES ('Fries',10, 10, 4, 800, 20, 20, 80);
INSERT INTO RECIPES (name, prep_Time, cook_Time, servings, calories, fat, protein, carb)
VALUES ('Baked Salmon',5, 20, 4, 430, 40, 40, 20);

INSERT INTO MEDIA_IN_RECIPES (recipe_ID) VALUES (1);
INSERT INTO MEDIA_IN_RECIPES (recipe_ID) VALUES (1);
INSERT INTO MEDIA_IN_RECIPES (recipe_ID) VALUES (2);
INSERT INTO MEDIA_IN_RECIPES (recipe_ID) VALUES (3);
INSERT INTO MEDIA_IN_RECIPES (recipe_ID) VALUES (4);
INSERT INTO MEDIA_IN_RECIPES (recipe_ID) VALUES (5);

INSERT INTO POSTS (content, category, user_ID) VALUES ('Look at this delicious hamburger', 1, '1');
INSERT INTO POSTS (content, category, user_ID) VALUES ('Taste my newest cheeseburger with onions', 1, '2');
INSERT INTO POSTS (content, category, user_ID) VALUES ('Loving this new spaghetti', 1, '3');
INSERT INTO POSTS (content, category, user_ID) VALUES ('The best type of way to cook potatoes is definitely fries', 1, '4');
INSERT INTO POSTS (content, category, user_ID) VALUES ('Eat healthy with this new salmon recipe', 1, '5');

INSERT INTO MEDIA_IN_POSTS (post_ID) VALUES (2);
INSERT INTO MEDIA_IN_POSTS (post_ID) VALUES (3);
INSERT INTO MEDIA_IN_POSTS (post_ID) VALUES (1);
INSERT INTO MEDIA_IN_POSTS (post_ID) VALUES (4);
INSERT INTO MEDIA_IN_POSTS (post_ID) VALUES (5);

INSERT INTO RECIPE_IN_POST VALUES (1, 1);
INSERT INTO RECIPE_IN_POST VALUES (2, 2);
INSERT INTO RECIPE_IN_POST VALUES (3, 3);
INSERT INTO RECIPE_IN_POST VALUES (4, 4);
INSERT INTO RECIPE_IN_POST VALUES (5, 5);

-- Inserting Ingredients
INSERT INTO INGREDIENTS (name, quantity, quantifier) VALUES ('Beef', 1, 'pound');
INSERT INTO INGREDIENTS (name, quantity, quantifier) VALUES ('Cheese', 2, 'slices');
INSERT INTO INGREDIENTS (name, quantity, quantifier) VALUES ('Pasta', 100, 'grams');
INSERT INTO INGREDIENTS (name, quantity, quantifier) VALUES ('Potato', 2, 'pieces');
INSERT INTO INGREDIENTS (name, quantity, quantifier) VALUES ('Salmon', 1, 'fillet');

-- Associating ingredients with recipes
INSERT INTO RECIPE_INGREDIENTS (recipe_ID, ingredient_ID) VALUES (1, 1);
INSERT INTO RECIPE_INGREDIENTS (recipe_ID, ingredient_ID) VALUES (2, 1);
INSERT INTO RECIPE_INGREDIENTS (recipe_ID, ingredient_ID) VALUES (2, 2);
INSERT INTO RECIPE_INGREDIENTS (recipe_ID, ingredient_ID) VALUES (3, 3);
INSERT INTO RECIPE_INGREDIENTS (recipe_ID, ingredient_ID) VALUES (4, 4);
INSERT INTO RECIPE_INGREDIENTS (recipe_ID, ingredient_ID) VALUES (5, 5);

-- Inserting Recipe Steps
INSERT INTO STEPS (content, number_order, recipe_ID) VALUES ('Cook the beef', 1, 1);
INSERT INTO STEPS (content, number_order, recipe_ID) VALUES ('Plate the dish', 2, 1);
INSERT INTO STEPS (content, number_order, recipe_ID) VALUES ('Add the cheese', 1, 2);
INSERT INTO STEPS (content, number_order, recipe_ID) VALUES ('Boil the pasta', 1, 3);
INSERT INTO STEPS (content, number_order, recipe_ID) VALUES ('Fry the potatoes', 1, 4);
INSERT INTO STEPS (content, number_order, recipe_ID) VALUES ('Bake the salmon', 1, 5);

-- Inserting Categories
INSERT INTO CATEGORIES (name) VALUES ('Fast Food');
INSERT INTO CATEGORIES (name) VALUES ('Main Dish');
INSERT INTO CATEGORIES (name) VALUES ('Sides');
INSERT INTO CATEGORIES (name) VALUES ('Healthy');
INSERT INTO CATEGORIES (name) VALUES ('Desserts');

-- Linking Categories to recipes
INSERT INTO RECIPE_CATEGORY (recipe_ID, category_name) VALUES (1, 'Fast Food');
INSERT INTO RECIPE_CATEGORY (recipe_ID, category_name) VALUES (2, 'Fast Food');
INSERT INTO RECIPE_CATEGORY (recipe_ID, category_name) VALUES (3, 'Main Dish');
INSERT INTO RECIPE_CATEGORY (recipe_ID, category_name) VALUES (4, 'Sides');
INSERT INTO RECIPE_CATEGORY (recipe_ID, category_name) VALUES (5, 'Healthy');

-- Inserting followers for users
INSERT INTO FOLLOWS (user_ID1, user_ID2) VALUES ('1', '2');
INSERT INTO FOLLOWS (user_ID1, user_ID2) VALUES ('1', '3');
INSERT INTO FOLLOWS (user_ID1, user_ID2) VALUES ('2', '1');
INSERT INTO FOLLOWS (user_ID1, user_ID2) VALUES ('3', '1');
INSERT INTO FOLLOWS (user_ID1, user_ID2) VALUES ('4', '5');

INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('Loved the Hamburger! Especially the beef quality.', 4.5, '2', 1);
INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('The cheese on the Cheeseburger melted perfectly.', 4, '3', 2);
INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('Spaghetti was a tad overcooked, but sauce was great!', 3.5, '4', 3);
INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('My kids loved the Fries. Crispy and golden!', 5, '5', 4);
INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('The Baked Salmon is a healthy and delicious option. Kudos!', 4.5, '1', 5);

INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('Would have preferred more seasoning on the Hamburger.', 3, '3', 1);
INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('The Cheeseburger was a bit greasy for my liking.', 2.5, '4', 2);
INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('Loved how the Spaghetti noodles were al dente.', 5, '5', 3);
INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('Fries were good, could have been a bit saltier.', 4, '1', 4);
INSERT INTO REVIEWS (content, rating, user_ID, recipe_ID) VALUES ('Not a fan of fish, but this Baked Salmon changed my mind.', 4, '2', 5);

-- Inserting User Reactions
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('1', '2', 1); -- Cloud likes Tifa's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('1', '3', 3); -- Cloud loves Aerith's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('1', '4', 4); -- Cloud is wowed by Barrett's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('1', '5', 1); -- Cloud likes Yuffie's post

INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('2', '1', 1); -- Tifa likes Cloud's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('2', '3', 2); -- Tifa dislikes Aerith's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('2', '4', 3); -- Tifa loves Barrett's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('2', '5', 1); -- Tifa likes Yuffie's post

INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('3', '1', 3); -- Aerith loves Cloud's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('3', '2', 1); -- Aerith likes Tifa's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('3', '4', 4); -- Aerith is wowed by Barrett's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('3', '5', 3); -- Aerith loves Yuffie's post

INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('4', '1', 1); -- Barrett likes Cloud's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('4', '2', 2); -- Barrett dislikes Tifa's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('4', '3', 1); -- Barrett likes Aerith's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('4', '5', 3); -- Barrett loves Yuffie's post

INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('5', '1', 4); -- Yuffie is wowed by Cloud's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('5', '2', 1); -- Yuffie likes Tifa's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('5', '3', 2); -- Yuffie dislikes Aerith's post
INSERT INTO USER_REACTIONS (user_ID, post_ID, type) VALUES ('5', '4', 1); -- Yuffie likes Barrett's post

-- Inserting User Notifications
-- Notifications for Cloud
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Tifa liked your post about the hamburger.', '1');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Aerith loved your post about the hamburger.', '1');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Barrett liked your post about the hamburger.', '1');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Yuffie was wowed by your post about the hamburger.', '1');

-- Notifications for Tifa
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Cloud liked your post about the cheeseburger.', '2');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Aerith liked your post about the cheeseburger.', '2');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Barrett disliked your post about the cheeseburger.', '2');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Yuffie liked your post about the cheeseburger.', '2');

-- Notifications for Aerith
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Cloud loved your post about the spaghetti.', '3');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Tifa disliked your post about the spaghetti.', '3');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Barrett liked your post about the spaghetti.', '3');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Yuffie disliked your post about the spaghetti.', '3');

-- Notifications for Barrett
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Cloud was wowed by your post about the fries.', '4');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Tifa loved your post about the fries.', '4');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Aerith was wowed by your post about the fries.', '4');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Yuffie liked your post about the fries.', '4');

-- Notifications for Yuffie
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Cloud liked your post about the baked salmon.', '5');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Tifa liked your post about the baked salmon.', '5');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Aerith loved your post about the baked salmon.', '5');
INSERT INTO USER_NOTIFICATIONS (message, user_ID) VALUES ('Barrett loved your post about the baked salmon.', '5');
