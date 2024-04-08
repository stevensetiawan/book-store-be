CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  writer VARCHAR(255),
  cover_image VARCHAR(255),
  point INTEGER,
  tags VARCHAR[]
  CONSTRAINT check_tags_validity CHECK (
    ARRAY['fiction', 'non-fiction', 'science', 'essay']::varchar[] @> tags
  )
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  points INTEGER DEFAULT 100,
  UNIQUE ("email")
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  book_id INTEGER REFERENCES books(id),
  quantity INTEGER,
  total_points INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);