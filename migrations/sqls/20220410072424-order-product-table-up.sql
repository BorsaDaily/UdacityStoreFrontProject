CREATE TABLE order_product_table (
  id SERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES order_table(id),
  product_id BIGINT REFERENCES product_table(id),
  user_id BIGINT REFERENCES user_table(id),
  qty INTEGER
);