import { user, userlogin, UsersData } from "../../models/users";
import supertest from "supertest";
import app from "../../server";
import storeDB from "../../database";

const request = supertest(app);
const userData = new UsersData();
let tokentest = "";
let userId = "";
const u: user = {
  firstname: "test1",
  lastname: "user",
  password: "testuser1password",
  username: "testuser1",
};
const loginData: userlogin = {
  username: "testuser1",
  password: "testuser1password",
};
describe("Test User handeler endpoints responses", () => {
  beforeAll(async () => {
    const newuser = await userData.create(u);
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

  it("test authentication user endpoint", async () => {
    const response = await request.post("/users/auth").send(loginData);
    const { username, token } = response.body.data;
    expect(response.status).toBe(200);
    expect(username).toBe(loginData.username);
  });

  it("test creat user endpoint", async () => {
    const response = await request.post("/users").send({
      firstname: "test2",
      lastname: "user",
      password: "testuser2password",
      username: "testuser2",
    });
    const { newUser, token } = response.body;
    expect(response.status).toBe(200);
    expect(newUser.username).toBe("testuser2");
    tokentest = token;
    userId = newUser.id;
  });

  it("test Get All Users endpoint", async () => {
    const response = await request
      .get("/users")
      .set("authorization", `Bearer ${tokentest}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
  });

  it("test Get User endpoint", async () => {
    const response = await request
      .get(`/users/:id`)
      .set("authorization", `Bearer ${tokentest}`)
      .send({ id: userId });
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual("testuser2");
  });
});

export default tokentest;
