CREATE TABLE order_table (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES user_table(id),
  status VARCHAR(20)
);