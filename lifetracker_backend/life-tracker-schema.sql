CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  password    TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),

  username    TEXT,
  first_name    TEXT,
  last_name    TEXT,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()

);
CREATE TABLE exercise (
  id          SERIAL PRIMARY KEY,
  name    TEXT NOT NULL,
  category    TEXT NOT NULL,
  duration       INT NOT NULL,
  intensity       INT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),

  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE TABLE nutrition (
  id          SERIAL PRIMARY KEY,
  name    TEXT NOT NULL,
  category    TEXT NOT NULL,
  quantity       INT NOT NULL,
  calories       INT NOT NULL,
  IMGURL       TEXT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),

  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE TABLE sleep (
  id          SERIAL PRIMARY KEY,
  start_time  TIMESTAMP NOT NULL,
  end_time  TIMESTAMP NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),

  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);



-- CREATE TABLE users (
--   id          SERIAL PRIMARY KEY,
--   password    TEXT NOT NULL,
--   username    TEXT NOT NULL UNIQUE,
--   email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
--   is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
--   created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
--   name    TEXT NOT NULL
-- );

-- CREATE TABLE products (
--   id          SERIAL PRIMARY KEY,
--   name    TEXT NOT NULL,
--   category    TEXT NOT NULL,
--   image       TEXT NOT NULL,
--   description    TEXT NOT NULL,
--   price  BIGINT NOT NULL
-- );

-- CREATE TABLE orders (
--   id          SERIAL PRIMARY KEY,
--   customer_id    INT NOT NULL,
--   created_at    TIMESTAMP NOT NULL DEFAULT NOW(),

--   FOREIGN KEY (customer_id) REFERENCES users(id)
-- );
-- CREATE TABLE order_details(
--   order_id INT NOT NULL,
--   product_id INT NOT NULL,
--   quantity INT NOT NULL DEFAULT 1,
--   discount INT,

--   FOREIGN KEY (order_id) REFERENCES orders(id),
--   FOREIGN KEY (product_id) REFERENCES products(id),
--   PRIMARY KEY (order_id, product_id)
-- )

