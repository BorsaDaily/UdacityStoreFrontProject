import { product, ProductsData } from "../../models/product";
import supertest from "supertest";
import app from "../../server";
import storeDB from "../../database";
import { user, UsersData } from "../../models/users";
import { order, OrdersData } from "../../models/order";

const request = supertest(app);
const productData = new ProductsData();
let tokentest = "";
let productID = 1;
let userId = 1;
let orderID = 1;
const p: product = {
  name: "testproduct1",
  price: 100,
  category: "testcategory1",
};

const userData = new UsersData();
const u: user = {
  firstname: "test1",
  lastname: "user",
  password: "testuser1password",
  username: "testuser1",
};
const ordersData = new OrdersData();
const o: order = {
  user_id: 1,
  status: "active",
};

describe("Test order handeler endpoints responses", () => {
  beforeAll(async () => {
    const response = await request
      .post("/users")
      .send(u)
      .then((response) => {
        const { newUser, token } = response.body;
        userId = parseInt(newUser.id as unknown as string);
        tokentest = token as string;
      })
      .then(async () => {
        const response = await request
          .post("/products")
          .set("Accept", "application/json")
          .set("authorization", `Bearer ${tokentest}`)
          .send(p);
        productID = parseInt(response.body.id as unknown as string);
      })
      .then(async () => {
        const response = await request
          .post("/orders")
          .set("Accept", "application/json")
          .set("authorization", `Bearer ${tokentest}`)
          .send({
            user_id: userId,
            status: "active",
          });
      });
  });

  afterAll(async () => {
    const conn = await storeDB.connect();
    const sql1 = "DELETE FROM user_table;";
    const sql2 = "DELETE FROM product_table;";
    const sql3 = "DELETE FROM order_table;";
    const sql4 = "DELETE FROM order_product_table;";
    await conn
      .query(sql4)
      .then(async () => {
        conn.query(sql3);
      })
      .then(async () => {
        conn.query(sql2);
      })
      .then(async () => {
        conn.query(sql1);
      });
    conn.release();
  });

  it("test Get order endpoint", async () => {
    console.log(orderID, userId, productID);
    const OrderResponse = await request
      .get("/orders/:id")
      .set("authorization", `Bearer ${tokentest}`)
      .send({ id: orderID.toString() });
    expect(OrderResponse.status).toBe(200);
    expect(parseInt(OrderResponse.body.id as unknown as string)).toEqual(
      orderID
    );
    expect(parseInt(OrderResponse.body.user_id as unknown as string)).toEqual(
      userId
    );
  });
});
